import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { ArrowRightIcon, LinkIcon, TrophyIcon } from '../icons';

const exploreCards = [
  {
    title: 'Achievements',
    description: 'Milestones, certifications, and accomplishments',
    href: '/achievements',
    Icon: TrophyIcon,
    borderColor: 'border-amber-500/50',
    titleGradient: 'from-amber-400 to-orange-500',
    linkColor: 'text-amber-700 dark:text-amber-300',
  },
  {
    title: 'My Links',
    description: 'Find me across the web and social platforms',
    href: '/links',
    Icon: LinkIcon,
    borderColor: 'border-cyan-500/50',
    titleGradient: 'from-cyan-400 to-blue-500',
    linkColor: 'text-cyan-700 dark:text-cyan-300',
  },
];

export default function OtherSection() {
  const { t } = useLanguage();

  return (
    <section id="other" className="py-12 md:py-16">
      <div className="section">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-[var(--foreground)] md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {t('More to Explore')}
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-[var(--muted)]">
            {t('Check out these additional resources and connect with me')}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
          {exploreCards.map((card, index) => (
            <motion.a
              key={card.href}
              href={card.href}
              className="group glass relative flex flex-col items-center overflow-hidden rounded-3xl border border-[var(--card-border)] p-8 text-center transition-colors duration-300 hover:border-transparent focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[var(--accent)]/5 opacity-0 ring-1 ring-inset ring-[var(--accent)]/35 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center">
                <div className={`mb-6 flex size-16 items-center justify-center rounded-2xl border-2 bg-[var(--card)]/50 text-[var(--foreground)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${card.borderColor}`}>
                  <card.Icon size={24} />
                </div>
                <h3 className={`mb-3 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent md:text-2xl ${card.titleGradient}`}>
                  {t(card.title)}
                </h3>
                <p className="mb-4 max-w-[200px] text-sm text-[var(--muted)]">
                  {t(card.description)}
                </p>
                <div className={`flex items-center gap-1 text-sm font-medium transition-all duration-300 group-hover:gap-2 ${card.linkColor}`}>
                  {t('Explore')}
                  <ArrowRightIcon size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
