import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { ArrowRightIcon } from '../icons';
import GradientText from '../ui/GradientText';
import Footer from './Footer';
import Header from './Header';

interface PortfolioSubpageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function PortfolioSubpage({ title, description, children }: PortfolioSubpageProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="relative isolate flex-1 overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] overflow-hidden">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[var(--gradient-start)] opacity-15 blur-[90px]" />
          <div className="absolute right-1/4 top-36 h-80 w-80 rounded-full bg-[var(--gradient-end)] opacity-10 blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        </div>

        <div className="section">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)]/60 px-3.5 py-2 text-sm font-medium text-[var(--muted)] backdrop-blur-md transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <ArrowRightIcon size={14} className="rotate-180" />
              {t('Back to home')}
            </Link>

            <motion.div
              className="mt-9 mb-10 text-center sm:mt-8 sm:mb-12"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <GradientText as="span" shimmer={!reduceMotion}>{title}</GradientText>
              </h1>
              <p className="mx-auto max-w-xl text-pretty text-base text-[var(--muted)] sm:text-lg">
                {description}
              </p>
            </motion.div>

            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
