import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import zh_tw from './locales/zh_TW.json';

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh_tw,
  },
};

const DEFAULT_LANGUAGE = 'en';
const LANG_KEY = 'userLanguage';

const savedLanguage = localStorage.getItem(LANG_KEY) || DEFAULT_LANGUAGE;

i18n.use(initReactI18next).init({
  resources, 
  fallbackLng: DEFAULT_LANGUAGE, 
  lng: savedLanguage, 
  interpolation: {
    escapeValue: false,
  },
});

i18n.changeLanguageAndSave = function (lng) {
  this.changeLanguage(lng, (err: any) => {
    if (!err) {
      localStorage.setItem(LANG_KEY, lng);
    }
  });
};

export default i18n;