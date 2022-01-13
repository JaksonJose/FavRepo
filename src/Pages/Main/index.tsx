import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Header, Form, SubmitButton, List, DeleteButton }  from './styles';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import I18nInstance  from '../../i18n/config';

import { api } from '../../services/api';

type repo = {
  name: string;
}

type lang = {
  name: string,
  short: string
}

export function Main(){
  const [newRepo, setNewRepo] = useState<string>('');
  const [langs, setLangs] = useState<Array<lang>>();
  const [repositories, setRepositories] = useState<Array<repo>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    const languagues = [{
        name: `${t('English.name')}`,
        short: `${t('English.short')}`
    },{
      name: `${t('Portuguese.name')}`,
      short: `${t('Portuguese.short')}`
    },{
      name: `${t('Spanish.name')}`,
      short: `${t('Spanish.short')}`
    }];
   
    setLangs(languagues);

  }, []);

  // Find repositories save in localStorage
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');

    if (repoStorage) {
      setRepositories(JSON.parse(repoStorage));
    }
  }, []);

  // Saving in localStorage
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositories));
  }, [repositories])

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    // Get the repositories by name
    async function submit() {
      setLoading(true);
      setAlert(false); //guarantee that alert is still null

      try {

        // if a repository does not exist
        if(newRepo === '') {
          throw new Error('Você precisa indicar um repositorio!');
        }

        const response = await api.get(`repos/${newRepo}`);

        // Very if the repository already exists
        const hasRepo = repositories.find(repo => repo.name === newRepo);

        if(hasRepo) {
          throw new Error('Resposiotrio Duplicado');          
        }
  
        const data = {
          name: response.data.full_name
        }
    
        setRepositories([...repositories, data]);
        setNewRepo('');

      } catch(error: any) {
        setAlert(true);
        console.log(alert);
        console.log(error);

      }finally {
        setLoading(false);
      }
    }

    submit();
  }, [newRepo, repositories]);

  /**
   * Callback to filter the repos list
   * @return all repos in the list but the one that was clicked
   */
  const handleDelete = useCallback((repoName: string) => {
    const find = repositories.filter((repo: repo) => repo.name !== repoName);
    setRepositories(find);
  }, [repositories]);

  // get string from impot
  function handleInputChange({ target }: any) {
    setNewRepo(target.value);
    setAlert(false);
  }

  
  // set the application languague (localizations)
  const handleLang = useCallback(({ target }) => {

    I18nInstance.changeLanguage(I18nInstance.language = target.value);
    
  }, []);

  return(
    <Container>
      <Header>
        <h1>
          <FaGithub size={25} />
          {t('My-Repositories')}
        </h1>
        
        <select onChange={handleLang}>
          {langs && langs.map((lang: lang, index: number) => (
             <option value={lang.short} key={index}>{lang.name}</option>
            ))
          }         
        </select>
      </Header>
  

        <Form onSubmit={handleSubmit} error={alert}>
          <input type="text" value={newRepo} 
            onChange={handleInputChange} placeholder={t('Add-Repositories')} />
      
          <SubmitButton loading={loading ? 1 : 0}>
            {
              loading ? <FaSpinner color="FFF" size={14} /> : <FaPlus color="#FFF" size={14} />
            }           
          </SubmitButton>
        </Form>

        <List>
            {repositories.map((repo: repo) => (
              <li key={repo.name}>
                <span>
                  <DeleteButton onClick={() => handleDelete(repo.name)}>
                    <FaTrash size={14} />
                  </DeleteButton>
                  {repo.name}
                </span>
                <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                  <FaBars size={20} />
                </Link>
              </li>
            ))}
        </List>
    </Container>
  );
}