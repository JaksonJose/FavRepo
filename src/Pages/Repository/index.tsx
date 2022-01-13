import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Container, Owner, Loading, BackButton, IssueList, PageActions, FilterList } from "./style";

import { api } from '../../services/api';
import { FaArrowLeft } from "react-icons/fa";

type repo = {
  name: string,
  description: string,
  owner: {
    avatar_url: string,
    login: string
  }
}

type issue = {
  id: number,
  title: string,
  html_url: string,
  user: {
    avatar_url: string,
    login: string
  },
  labels: [{
    id: number,
    name: string
  }]
}

type Filters = {
  state: string,
  label: string,
  active: boolean
}

export function Repository() {
  const params = useParams();
  const { t } = useTranslation();

  const [repository, setRepository] = useState<repo>();
  const [issues, setIssues] = useState<Array<issue>>()
  const [loading, setLoading] = useState<Boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [filterIndex, setFilterIndex] = useState<number>(0);
  const [filters, setFilters] = useState<Filters[]>([
    {state: 'all', label: `${t('All')}`, active: true},
    {state: 'open', label: `${t('Open')}`, active: false},
    {state: 'closed', label: `${t('Close')}`, active: false}
  ]);

  // load repository chosed and its issue
  useEffect(() => {
    async function loadRepo() {
      const nameRepo = params.repository;

      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${nameRepo}`), 
        api.get(`/repos/${nameRepo}/issues`, {
          params: { 
            state: filters.find(f => f.active)!.state, 
            per_page: 5}
          })
      ]);

      setRepository(repoData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    loadRepo();
  }, [params.repository]);

  useEffect(() => {
    
    // Load repository issues, 5 per page 
    async function loadIssue() {
      const nameRepo = params.repository;

      const response = await api.get(`/repos/${nameRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page: page,
          per_page: 5, //pagination
        }
      });

      setIssues(response.data);
    }

    loadIssue();
  }, [params.repository, page, filterIndex, filters])

  /**
   * Controls the page
   * @param action
   */
  const handlePage = (action: string) => setPage(action === 'back' ? page - 1 : page + 1);
  
  /**
   * Set index number for filtering the issue state
   * @param index 
   * 
   */
  const handlefilter = (index: number) => setFilterIndex(index);

  if(loading) {
    return (
      <Loading>
        <h1>{t('loading')}</h1>
      </Loading>
    )
  }

  return(
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>
      {
        repository && (
          <Owner>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>
        )
      }

      <FilterList active={filterIndex}>
        {filters.map((filter, index) => (
          <button key={index} type="button" onClick={() => handlefilter(index) }>
            {filter.label}
          </button>
        ))}
      </FilterList>

      <IssueList>
        { 
          issues && issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />

              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  <div>
                  {issue.labels.map((label: any) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </div>
                </strong>

                    <p>{issue.user.login}</p>

              </div>
            </li>
          ))
        }
      </IssueList> 
      
      <PageActions>
        <button type="button" 
        disabled={page < 2}
        onClick={() => handlePage('back')}>{t('back')}</button>
        <button type="button" onClick={() => handlePage('next')}>{t('next')}</button>
      </PageActions>
    </Container>
  );
}