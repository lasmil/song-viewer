import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';
import ro from './ro.json';
import hu from './hu.json';

i18n.use(initReactI18next).init({
  // we init with resources
  resources: {
    en: {
      translations: en,
    },
    ro: {
      translations: ro,
    },
    hu: {
      translations: hu,
    },
    es: {
      translations: es,
    },
  },
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
