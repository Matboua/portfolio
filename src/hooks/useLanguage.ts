import { createContext, useContext } from 'react';
import { translations } from '../data/translations';

export const languageNames = { de: 'Deutsch', en: 'English', fr: 'Français' } as const;
export type Language = keyof typeof languageNames;

export function isLanguage(value: string | null): value is Language {
  return value !== null && Object.prototype.hasOwnProperty.call(languageNames, value);
}

export const LanguageContext = createContext({
  language: 'de' as Language,
  setLanguage: (() => {}) as (language: Language) => void,
});

export function translate(language: Language, text: string) {
  if (language === 'en' || !Object.prototype.hasOwnProperty.call(translations, text)) return text;
  return translations[text as keyof typeof translations][language];
}

export function useLanguage() {
  const { language, setLanguage } = useContext(LanguageContext);
  return { language, setLanguage, t: (text: string) => translate(language, text) };
}
