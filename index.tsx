import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from './services/i18n';
import './index.css';

// Conditional Tailwind for Dev: Inject CDN if in development mode
if (process.env.NODE_ENV === 'development') {
  const existingLink = document.querySelector('script[src*="cdn.tailwindcss.com"]');
  if (!existingLink) {
    const script = document.createElement('script');
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);
    
    const configScript = document.createElement('script');
    configScript.textContent = `
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            fontFamily: {
              sans: ['var(--font-primary)', 'sans-serif'],
            },
            colors: {
              primary: {
                50: 'var(--primary-50)',
                100: 'var(--primary-100)',
                200: 'var(--primary-200)',
                300: 'var(--primary-300)',
                400: 'var(--primary-400)',
                500: 'var(--primary-500)',
                600: 'var(--primary-600)',
                700: 'var(--primary-700)',
                800: 'var(--primary-800)',
                900: 'var(--primary-900)',
                950: 'var(--primary-950)',
              }
            }
          }
        }
      }
    `;
    document.head.appendChild(configScript);
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);