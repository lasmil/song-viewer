import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import en.json
import en from './en.js';
import es from './es.js';
import ro from './ro.js';
import hu from './hu.js';

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
