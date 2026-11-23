import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { ExternalLinkIcon } from '../icons';

const youtubeUrl = 'https://youtu.be/mT4giYQK11Y';
const embedUrl = 'https://www.youtube.com/embed/mT4giYQK11Y?playsinline=1';

export default function ApplicationVideoSection() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const title = t('Application Video');

  return (
    <section aria-labelledby="application-video-title" className="py-8 md:py-12">
      <div className="section">
        <motion.div
          className="mb-10 text-center md:mb-16"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <h2 id="application-video-title" className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="gradient-text">{title}</span>
          </h2>
          <p className="mx-auto max-w-xl text-[var(--muted)]">
            {t('A short introduction to my background and why I want to pursue an apprenticeship in Germany.')}
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-5xl gap-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/65 p-3 backdrop-blur-xl sm:gap-6 sm:p-6"
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <div className="aspect-video overflow-hidden rounded-xl border border-[var(--card-border)] bg-black">
            <iframe
              className="block h-full w-full"
              src={embedUrl}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="flex justify-center">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3.5 py-2 text-sm font-medium text-[var(--accent)] transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              {t('Watch on YouTube')}
              <ExternalLinkIcon size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
