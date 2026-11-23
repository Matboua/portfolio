import { useEffect, useState, type ReactNode } from 'react';
import { isLanguage, LanguageContext, translate, type Language } from '../../hooks/useLanguage';

const storageKey = 'portfolio-language';

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(storageKey);
    return isLanguage(saved) ? saved : 'de';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    const title = `Oussama Matboua | ${translate(language, 'System Integration')}`;
    const description = translate(language, 'Cybersecurity and cloud graduate seeking a system integration apprenticeship in Germany');
    document.title = title;
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute('content', title);
    }
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute('content', description);
    }
    localStorage.setItem(storageKey, language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
