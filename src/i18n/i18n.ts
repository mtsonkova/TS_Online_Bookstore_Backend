// src/i18n/i18n.ts

import i18next from 'i18next';
import en from '@src/i18n/messages_en.json'; // adjust path if needed

i18next.init({
  lng: 'en', // default language
  fallbackLng: 'en', // fallback if key not found
  resources: {
    en: {
      translation: en,
    },
  },
  
  interpolation: {
    escapeValue: false, // not needed for Node.js (no XSS risk)
  },
})
.then(() => {
  console.log('[i18n] i18next initialized successfully');
})
.catch((err) => {
  console.error('[i18n] i18next initialization error:', err);
});

export default i18next;
