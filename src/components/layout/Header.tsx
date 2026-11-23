import { languageNames, useLanguage, type Language } from '../../hooks/useLanguage';
import React, { useState, useEffect, useId, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { navigationItems } from '../../data/navigation';
import { useTheme } from '../../hooks/useTheme';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon, DownloadIcon } from '../icons';
const languageFlags: Record<Language, string> = { de: '🇩🇪', en: '🇬🇧', fr: '🇫🇷' };
const resumeUrl = `${import.meta.env.BASE_URL}files/Oussama-Matboua-Lebenslauf.pdf`;

const navItems = [
  { label: 'Home', href: '/#home' },
  ...navigationItems,
].map((item) => ({ ...item, sectionId: item.href.split('#')[1] }));

const navItemsFromBottom = [...navItems].reverse();

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuId = useId();
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const languageToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isLanguageMenuOpen) return;

    const dismissOutside = (event: PointerEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', dismissOutside);
    return () => document.removeEventListener('pointerdown', dismissOutside);
  }, [isLanguageMenuOpen]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isDark, isAutomatic, toggleTheme, resetTheme } = useTheme();

  useEffect(() => {
    if (pathname !== '/') return;

    const updateActiveSection = () => {
      const atBottom = window.scrollY >= 100 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const section = atBottom ? navItems.at(-1) : navItemsFromBottom.find(({ sectionId }) => {
        const element = document.getElementById(sectionId);
        return element !== null && element.getBoundingClientRect().top <= 150;
      });
      setActiveSection(section?.sectionId ?? 'home');
    };

    const frame = requestAnimationFrame(updateActiveSection);
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [pathname]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
    <header
        className={`
          fixed top-4 left-0 right-0 z-50
          transition-all duration-300 ease-out
          py-3
        `.replace(/\s+/g, ' ').trim()}
      >
        <div className="section">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-full border border-[var(--card-border)] bg-[var(--card)]/80 p-0.5 shadow-lg shadow-black/5 backdrop-blur-md">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={isDark ? t("Switch to light mode") : t("Switch to dark mode")}
                  className="rounded-full p-2 text-amber-500 transition-colors hover:bg-[var(--foreground)]/10 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                >
                  {isDark ? <MoonIcon size={18} /> : <SunIcon size={18} />}
                </button>
                {!isAutomatic && (
                  <button
                    type="button"
                    onClick={resetTheme}
                    aria-label={t("Follow device theme")}
                    title={t("Follow device theme")}
                    className="rounded-full px-2 py-1 text-xs font-medium text-[var(--muted)] transition-colors hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    Auto
                  </button>
                )}
              </div>
              <div
                ref={languageMenuRef}
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setIsLanguageMenuOpen(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape' && isLanguageMenuOpen) {
                    event.stopPropagation();
                    setIsLanguageMenuOpen(false);
                    languageToggleRef.current?.focus();
                  }
                }}
              >
                <button
                  ref={languageToggleRef}
                  type="button"
                  aria-label={`${t("Language")}: ${languageNames[language]}`}
                  aria-expanded={isLanguageMenuOpen}
                  aria-controls={isLanguageMenuOpen ? languageMenuId : undefined}
                  onClick={() => setIsLanguageMenuOpen((open) => !open)}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)]/80 px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-lg shadow-black/5 backdrop-blur-md transition-colors hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] aria-expanded:border-[var(--accent)]/60"
                >
                  <span aria-hidden="true">{languageFlags[language]}</span>
                  <span lang={language}>{languageNames[language]}</span>
                  <FaChevronDown aria-hidden="true" className={`ml-0.5 text-[9px] text-[var(--muted)] transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLanguageMenuOpen && (
                  <ul
                    id={languageMenuId}
                    className="absolute left-0 top-full z-10 mt-2 grid min-w-40 gap-0.5 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-1.5 shadow-xl shadow-black/15"
                  >
                    {(Object.keys(languageNames) as Language[]).map((code) => (
                      <li key={code}>
                        <button
                          type="button"
                          lang={code}
                          aria-pressed={language === code}
                          onClick={() => {
                            setLanguage(code);
                            setIsLanguageMenuOpen(false);
                            languageToggleRef.current?.focus();
                          }}
                          className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)]/5 focus-visible:outline-2 focus-visible:outline-[var(--accent)] aria-pressed:bg-[var(--accent)]/10 aria-pressed:font-semibold"
                        >
                          <span aria-hidden="true">{languageFlags[code]}</span>
                          {languageNames[code]}
                          {language === code && <FaCheck aria-hidden="true" className="ml-auto text-[10px] text-[var(--accent)]" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Center - Navigation Pills */}
            <div
              className="
                hidden lg:flex items-center gap-1
                px-2 py-1.5
                rounded-full
                shadow-lg shadow-black/5
                backdrop-blur-md
              "
              style={{
                backgroundColor: isDark ? 'rgba(30, 30, 35, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
              }}
            >
              {navItems.map((item) => {
                const isActive = pathname === '/' && activeSection === item.sectionId;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => setActiveSection(item.sectionId)}
                    className={`
                      px-4 py-1.5 text-sm font-medium
                      rounded-full
                      transition-all duration-200
                      ${isActive
                        ? isDark
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-gray-900 shadow-sm'
                        : isDark
                          ? 'text-gray-400 hover:text-white hover:bg-white/10'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                      }
                    `.replace(/\s+/g, ' ').trim()}
                  >
                    {t(item.label)}
                  </a>
                );
              })}
            </div>

            {/* Right - CTA Button */}
            <div className="hidden lg:flex items-center">
              <a
                href={resumeUrl}
                download
                className="
                  inline-flex items-center gap-2
                  px-4 py-2
                  text-sm font-medium
                  rounded-full
                  shadow-lg shadow-black/5
                  backdrop-blur-md
                  transition-all duration-200
                  hover:scale-105
                "
                style={{
                  backgroundColor: isDark ? 'rgba(30, 30, 35, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                  color: isDark ? '#e4e4e7' : '#18181b',
                }}
              >
                <DownloadIcon size={16} />
                {t("Download Resume")}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="
                  p-2 rounded-full
                  bg-white/80 dark:bg-white/10
                  shadow-sm
                  text-gray-700 dark:text-gray-300
                  hover:bg-white dark:hover:bg-white/20
                  transition-all duration-200
                  backdrop-blur-sm
                "
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                  color: isDark ? '#d4d4d8' : '#374151',
                }}
                aria-label={isMobileMenuOpen ? t("Close menu") : t("Open menu")}
              >
                {isMobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40
          backdrop-blur-xl
          transition-all duration-300 ease-out
          lg:hidden
          ${isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }
        `.replace(/\s+/g, ' ').trim()}
        style={{
          backgroundColor: isDark ? 'rgba(10, 10, 15, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-4">
          {navItems.map((item, index) => {
            const isActive = pathname === '/' && activeSection === item.sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => {
                  setActiveSection(item.sectionId);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  px-8 py-3 text-xl font-medium
                  rounded-full
                  transition-all duration-200
                  ${isActive
                    ? isDark
                      ? 'bg-white/20 text-white'
                      : 'bg-purple-100 text-purple-900'
                    : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                  }
                `.replace(/\s+/g, ' ').trim()}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {t(item.label)}
              </a>
            );
          })}
          <a
            href={resumeUrl}
            download="Oussama-Matboua-Lebenslauf.pdf"
            className="
              mt-6 inline-flex items-center gap-2
              px-6 py-3
              text-base font-medium
              rounded-full
              bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]
              text-white
              shadow-lg
              hover:opacity-90
              transition-all duration-200
            "
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <DownloadIcon size={18} />
            {t("Download Resume")}
          </a>
        </nav>
      </div>
    </>
  );
};

export default Header;
