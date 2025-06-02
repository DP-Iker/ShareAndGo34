import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json";
import esTranslation from "./locales/es/translation.json";
import caTranslation from "./locales/ca/translation.json";

void i18n
  .use(new LanguageDetector())
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      ca: { translation: caTranslation },
    },
  });

export default i18n;
