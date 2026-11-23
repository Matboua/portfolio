import { useId, useLayoutEffect, useRef, useState } from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import { CloseIcon, ExternalLinkIcon } from '../icons';
import { useLanguage } from '../../hooks/useLanguage';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  thumbnail?: string;
  year?: number;
}

interface ImageGalleryProps {
  items: GalleryItem[];
  openLabel?: string;
  closeLabel?: string;
}

export default function ImageGallery({
  items,
  openLabel = 'Enlarge image',
  closeLabel = 'Close preview',
}: ImageGalleryProps) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
  }, [selected]);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`${t(openLabel)}: ${t(item.title)}`}
              onClick={() => setSelected(item)}
              className="showcase-glass group flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] text-left transition-colors hover:border-[var(--accent)]/60 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <span className="relative grid h-56 w-full place-items-center overflow-hidden border-b border-[var(--card-border)] bg-gradient-to-br from-[var(--accent)]/10 to-[var(--background)]/20 p-4 sm:h-64">
                <img
                  src={item.thumbnail ?? item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full min-h-0 w-full object-contain drop-shadow-md transition-transform duration-300 motion-safe:group-hover:scale-105"
                />
                <span aria-hidden="true" className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full border border-[var(--card-border)] bg-[var(--card)] text-[var(--accent)] shadow-sm">
                  <FaSearchPlus size={14} />
                </span>
              </span>
              <span className="flex w-full flex-1 items-start justify-between gap-3 p-4 sm:p-5">
                <span>
                  <span className="block font-semibold">{t(item.title)}</span>
                  <span className="mt-1 block text-sm text-[var(--muted)]">{t(item.description)}</span>
                </span>
                {item.year !== undefined && (
                  <time dateTime={String(item.year)} className="shrink-0 rounded-full border border-[var(--card-border)] px-2.5 py-1 font-mono text-xs text-[var(--muted)]">
                    {item.year}
                  </time>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[min(94vw,58rem)] max-w-none overflow-y-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-0 text-[var(--foreground)] shadow-2xl backdrop:bg-black/75"
      >
        <div>
          <div className="flex items-center justify-between gap-3 border-b border-[var(--card-border)] px-4 py-3">
            <h2 id={titleId} className="min-w-0 text-base! font-semibold sm:text-lg!">{selected && t(selected.title)}</h2>
            <button
              type="button"
              autoFocus
              aria-label={t(closeLabel)}
              onClick={() => dialogRef.current?.close()}
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full transition-colors hover:bg-[var(--foreground)]/10 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <CloseIcon size={18} />
            </button>
          </div>
          {selected && (
            <div className="grid justify-items-center gap-3 p-3 sm:p-4">
              <img
                src={selected.image}
                alt={t(selected.title)}
                className="max-h-[68dvh] max-w-full rounded-lg object-contain"
              />
              <a
                href={selected.image}
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
    </>
  );
}
