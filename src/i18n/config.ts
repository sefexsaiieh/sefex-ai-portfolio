import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ms from './ms.json';
import fr from './fr.json';
import es from './es.json';

const resources = {
  en: { translation: en },
  ms: { translation: ms },
  fr: { translation: fr },
  es: { translation: es },
};

// Simple browser language detector (no external dependency)
function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  const lang = navigator.language?.split('-')[0]?.toLowerCase() || 'en';
  return ['en', 'ms', 'fr', 'es'].includes(lang) ? lang : 'en';
}

void i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  lng: detectBrowserLanguage(),
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
