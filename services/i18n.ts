
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './translations';

// Get default language from storage
const savedLang = localStorage.getItem('kmm_lang');
// Note: We cannot await getSettings() here as it is asynchronous.
// App.tsx handles syncing the language once settings are loaded.
const defaultLang = savedLang || 'id';

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
