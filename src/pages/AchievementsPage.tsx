import { useRef, useState } from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import PortfolioSubpage from '../components/layout/PortfolioSubpage';
import { CloseIcon, ExternalLinkIcon } from '../components/icons';
import { useLanguage } from '../hooks/useLanguage';

const achievements = [
  { id: 'gsna', title: 'GSNA Solutions', description: 'Cybersecurity internship certificate', year: 2026 },
  { id: 'telc-b2', title: 'telc Deutsch B2', description: 'German language certificate', year: 2025 },
  { id: 'tryhackme', title: 'TryHackMe Pre Security', description: 'Pre Security learning path certificate', year: 2025 },
  { id: 'goethe-b1', title: 'Goethe-Zertifikat B1', description: 'German language certificate', year: 2021 },
];

const certificateUrl = (id: string, thumbnail = false) =>
  `${import.meta.env.BASE_URL}images/certificates/${id}${thumbnail ? '-thumb' : ''}.webp`;

export default function AchievementsPage() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<(typeof achievements)[number] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <PortfolioSubpage
      title={t('My Achievements')}
      description={t('Certificates from my internship, cybersecurity training, and German studies.')}
    >
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {achievements.map((achievement) => (
          <li key={achievement.id}>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`${t('View certificate')}: ${achievement.title}`}
              onClick={() => {
                setSelected(achievement);
                dialogRef.current?.showModal();
              }}
              className="group flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] text-left shadow-sm transition-colors hover:border-[var(--accent)]/60 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <span className="relative grid h-56 w-full place-items-center overflow-hidden border-b border-[var(--card-border)] bg-gradient-to-br from-[var(--accent)]/10 to-[var(--background)] p-4 sm:h-64">
                <img
                  src={certificateUrl(achievement.id, true)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full min-h-0 w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                />
                <span aria-hidden="true" className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full border border-[var(--card-border)] bg-[var(--card)] text-[var(--accent)] shadow-sm">
                  <FaSearchPlus size={14} />
                </span>
              </span>
              <span className="flex w-full flex-1 items-start justify-between gap-3 p-4 sm:p-5">
                <span>
                  <span className="block font-semibold">{achievement.title}</span>
                  <span className="mt-1 block text-sm text-[var(--muted)]">{t(achievement.description)}</span>
                </span>
                <time dateTime={String(achievement.year)} className="shrink-0 rounded-full border border-[var(--card-border)] px-2.5 py-1 font-mono text-xs text-[var(--muted)]">
                  {achievement.year}
                </time>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="certificate-title"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[min(94vw,58rem)] max-w-none overflow-y-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-0 text-[var(--foreground)] shadow-2xl backdrop:bg-black/75"
      >
        <div>
          <div className="flex items-center justify-between gap-3 border-b border-[var(--card-border)] px-4 py-3">
            <h2 id="certificate-title" className="text-base font-semibold">{selected?.title}</h2>
            <button
              type="button"
              autoFocus
              aria-label={t('Close certificate')}
              onClick={() => dialogRef.current?.close()}
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full transition-colors hover:bg-[var(--foreground)]/10 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <CloseIcon size={18} />
            </button>
          </div>
          {selected && (
            <div className="grid justify-items-center gap-3 p-3 sm:p-4">
              <img
                src={certificateUrl(selected.id)}
                alt={`${t('Certificate')}: ${selected.title}`}
                className="max-h-[68dvh] max-w-full rounded-lg object-contain"
              />
              <a
                href={certificateUrl(selected.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              >
                {t('Open full-size image')}
                <ExternalLinkIcon size={14} />
              </a>
            </div>
          )}
        </div>
      </dialog>
    </PortfolioSubpage>
  );
}
