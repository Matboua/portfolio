import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { FaSearchPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { ArrowRightIcon, CloseIcon } from '../icons';

interface Slide {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage?: string;
  year?: number;
}

interface ExploreCarouselProps {
  title: string;
  slides: Slide[];
  containImage?: boolean;
  href: string;
  linkLabel: string;
}

const slideVariants = {
  enter: (direction: number) => ({ x: `${direction * 100}%` }),
  visible: { x: '0%' },
  exit: (direction: number) => ({ x: `${direction * -100}%` }),
};

const collectionLinkStyle = 'showcase-glass inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-6 py-3 text-center font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]';

const controlStyle = 'showcase-glass grid size-9 cursor-pointer place-items-center rounded-full border border-[var(--card-border)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]';

export default function ExploreCarousel({ title, slides, containImage, href, linkLabel }: ExploreCarouselProps) {
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(panelRef, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogTitleId = useId();
  const previewOrigin = useRef<DOMRect | null>(null);
  const [preview, setPreview] = useState<Slide | null>(null);
  const [hovered, setHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const canRotate = !reduceMotion && slides.length > 1;
  const rotating = canRotate && isVisible && !preview && !hovered && !hasFocus;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [index, rotating, slides.length]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const origin = previewOrigin.current;
    if (!preview || !dialog || dialog.open) return;

    dialog.showModal();
    if (reduceMotion || !origin) return;

    const target = dialog.getBoundingClientRect();
    const animation = dialog.animate([
      {
        transformOrigin: 'top left',
        transform: `translate(${origin.left - target.left}px, ${origin.top - target.top}px) scale(${origin.width / target.width}, ${origin.height / target.height})`,
      },
      { transformOrigin: 'top left', transform: 'translate(0, 0) scale(1)' },
    ], {
      duration: 440,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    });

    return () => animation.cancel();
  }, [preview, reduceMotion]);

  const move = (step: number) => {
    setDirection(step);
    setIndex((current) => (current + step + slides.length) % slides.length);
  };

  const slide = slides[index];

  return (
    <section aria-label={t(title)} className="flex min-w-0 flex-col">
      <h3 className="mb-4 text-center text-xl! md:text-2xl!">
        <span className="gradient-text">{t(title)}</span>
      </h3>
      <div
        ref={panelRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHasFocus(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
        }}
        className="showcase-glass flex flex-1 flex-col overflow-hidden rounded-3xl border border-[var(--card-border)] transition-[border-color,box-shadow,scale] duration-300 ease-out motion-safe:hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-[0_-5px_35px_rgba(168,85,247,0.5)]!"
      >
        <div aria-live={rotating ? 'off' : 'polite'} aria-atomic="true" className="relative flex flex-1 flex-col overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.button
              key={slide.id}
              type="button"
              aria-haspopup="dialog"
              aria-label={`${t('Enlarge image')}: ${t(slide.title)}`}
              onClick={() => {
                previewOrigin.current = panelRef.current?.getBoundingClientRect() ?? null;
                setPreview(slide);
              }}
              custom={direction}
              variants={slideVariants}
              initial={reduceMotion ? false : 'enter'}
              animate="visible"
              exit={reduceMotion ? undefined : 'exit'}
              transition={{ duration: reduceMotion ? 0 : 0.48, ease: 'easeInOut' }}
              className="group flex w-full flex-1 cursor-pointer flex-col text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <span className={`relative block w-full aspect-video overflow-hidden border-b border-[var(--card-border)] ${containImage ? 'p-3' : ''}`}>
                <img
                  src={slide.image}
                  alt=""
                  loading="lazy"
                  className={`h-full w-full ${containImage ? 'object-contain drop-shadow-md' : 'object-cover'}`}
                />
                <span aria-hidden="true" className="showcase-glass absolute right-3 bottom-3 grid size-9 place-items-center rounded-full border border-[var(--card-border)] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                  <FaSearchPlus size={14} />
                </span>
              </span>
              <span className="flex w-full flex-1 items-start justify-between gap-3 p-4 sm:p-5">
                <span className="min-w-0">
                  <span className="block text-base font-semibold leading-snug">{t(slide.title)}</span>
                  <span className="mt-1 block text-sm leading-snug text-[var(--muted)]">{t(slide.description)}</span>
                </span>
                {slide.year && (
                  <time dateTime={String(slide.year)} className="rounded-full border border-[var(--card-border)] px-2 py-1 font-mono text-xs text-[var(--muted)]">{slide.year}</time>
                )}
              </span>
            </motion.button>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--card-border)] px-4 py-3">
          <span className="font-mono text-xs tabular-nums text-[var(--muted)]">{index + 1} / {slides.length}</span>
          <div className="flex items-center gap-2">
            <button type="button" aria-label={t('Previous slide')} onClick={() => move(-1)} className={controlStyle}>
              <ArrowRightIcon size={16} className="rotate-180" />
            </button>
            <button type="button" aria-label={t('Next slide')} onClick={() => move(1)} className={controlStyle}>
              <ArrowRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          to={href}
          className={collectionLinkStyle}
        >
          {t(linkLabel)}
          <ArrowRightIcon size={17} />
        </Link>
      </div>
      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="carousel-preview fixed inset-0 m-auto max-h-[90dvh] w-[min(94vw,58rem)] max-w-none overflow-y-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-0 text-[var(--foreground)] shadow-2xl backdrop:bg-black/75"
      >
        <div>
          <div className="flex items-center justify-between gap-3 border-b border-[var(--card-border)] px-4 py-3">
            <h4 id={dialogTitleId} className="text-base font-semibold">{preview && t(preview.title)}</h4>
            <button type="button" autoFocus aria-label={t('Close preview')} onClick={() => dialogRef.current?.close()} className={controlStyle}>
              <CloseIcon size={18} />
            </button>
          </div>
          {preview && (
            <div className="grid justify-items-center gap-4 p-4">
              <img
                src={preview.previewImage ?? preview.image}
                alt={t(preview.title)}
                className="h-[min(60dvh,38rem)] w-full rounded-lg object-contain"
              />
              <Link to={href} className={collectionLinkStyle} onClick={() => dialogRef.current?.close()}>
                {t(linkLabel)}
                <ArrowRightIcon size={17} />
              </Link>
            </div>
          )}
        </div>
      </dialog>
    </section>
  );
}
