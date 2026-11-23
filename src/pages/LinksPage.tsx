import { FaGlobe } from 'react-icons/fa';
import PortfolioSubpage from '../components/layout/PortfolioSubpage';
import { ArrowRightIcon, EmailIcon, ExternalLinkIcon, GitHubIcon, LinkedInIcon } from '../components/icons';
import { socialLinks } from '../data/socialLinks';
import { useLanguage } from '../hooks/useLanguage';

const linkIcons = {
  github: <GitHubIcon size={22} />,
  linkedin: <LinkedInIcon size={22} />,
  website: <FaGlobe size={20} />,
  email: <EmailIcon size={22} />,
};

export default function LinksPage() {
  const { t } = useLanguage();

  return (
    <PortfolioSubpage
      title={t('My Links')}
      description={t('Find my projects, connect on LinkedIn, or get in touch by email.')}
    >
      <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
        {socialLinks.map((link) => {
          const isEmail = link.icon === 'email';
          return (
            <li key={link.id}>
              <a
                href={link.href}
                target={isEmail ? undefined : '_blank'}
                rel={isEmail ? undefined : 'noopener noreferrer'}
                className="group flex h-full items-center gap-3 rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/65 p-4 backdrop-blur-xl transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--card)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] sm:gap-4 sm:p-5"
              >
                <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/10 text-[var(--accent)] sm:size-12">
                  {linkIcons[link.icon]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{t(link.name)}</span>
                  <span className="mt-1 block break-all text-sm text-[var(--muted)]">
                    {link.href.replace(/^(https:\/\/|mailto:)/, '')}
                  </span>
                </span>
                <span aria-hidden="true" className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                  {isEmail ? <ArrowRightIcon size={17} /> : <ExternalLinkIcon size={17} />}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </PortfolioSubpage>
  );
}
