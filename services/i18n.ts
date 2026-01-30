import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './translations';
import { getSettings } from './storage';

// Get default language from storage or settings
const savedLang = localStorage.getItem('kmm_lang');
const settings = getSettings();
const defaultLang = savedLang || settings.defaultLanguage || 'id';

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18next;