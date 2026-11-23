import { useLanguage } from '../../hooks/useLanguage';
import React from 'react';
import { socialLinks } from '../../data/socialLinks';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '../icons';

const footerLinks = socialLinks.filter((link) => link.icon !== 'website');
const footerIcons = { github: GitHubIcon, linkedin: LinkedInIcon, email: EmailIcon };

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-[var(--card-border)] bg-transparent">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left Side: Brand & Copyright */}
        <div className="flex items-center gap-4 text-sm text-[var(--muted)] font-mono group hover:text-[var(--foreground)] transition-colors duration-300">
          <span className="font-bold text-[var(--foreground)] text-lg group-hover:text-amber-400 transition-colors">OM</span>
          <span>•</span>
          <span>© {currentYear} Oussama Matboua</span>
        </div>

        {/* Center: Tech Attribution */}
        <div className="text-sm text-[var(--muted)] flex items-center gap-2 hover:text-[var(--foreground)] transition-colors duration-300">
          {t("Built with")} <span className="text-red-500 animate-pulse">❤️</span> <span className="font-medium text-cyan-400">React</span> {t("and")} <span className="font-medium text-sky-400">Tailwind</span>
        </div>

        <nav aria-label={t("Social links")} className="flex items-center gap-6">
          {footerLinks.map((link) => {
            const Icon = footerIcons[link.icon];
            return (
              <a
                key={link.id}
                href={link.href}
                target={link.icon === 'email' ? undefined : '_blank'}
                rel={link.icon === 'email' ? undefined : 'noopener noreferrer'}
                className="rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]"
                aria-label={t(link.name)}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
