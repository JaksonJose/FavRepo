import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';



i18n.use(initReactI18next)
    .use(initReactI18next).init({
      fallbackLng: 'en',
      lng: 'en',
      resources: {
        pt: {
          translations: require('./locales/pt-br/translations.json')
        },
        en: {
          translations: require('./locales/en-us/translations.json')
        },
        es: {
          translations: require('./locales/es-es/translations.json')
        }
      },
      ns: ['translations'],
      defaultNS: 'translations'
    });

i18n.languages = ['en', 'pt'];

export default i18n;