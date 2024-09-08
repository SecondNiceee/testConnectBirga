import React, { forwardRef, memo } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import enTranslation from "../../translation/enTranslation.json"
import en from '../../constants/language';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
    },
    lng: en ? "en" : "ru", // set default language
    fallbackLng: 'en', // set fallback language
    interpolation: { escapeValue: false },
  });

const Text = forwardRef(({ children, ...props} , ref) => {
    const { t, i18n } = useTranslation();
    return (
        <p ref={ref} {...props}>{t(String(children))}</p>
    );
});

export default memo(Text);