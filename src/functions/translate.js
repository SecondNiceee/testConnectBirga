import React from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import enTranslation from "../translation/enTranslation.json"
import en from '../constants/language';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
    },
    lng:  en ? 'en' : "ru", // set default language
    fallbackLng: 'en', // set fallback language
    interpolation: { escapeValue: false },
  });

const translation = (text) => {
    return i18n.t(String(text))
}
export default translation