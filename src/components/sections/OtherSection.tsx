import { motion, useReducedMotion } from 'framer-motion';
import { achievements, certificates, certificateUrl } from '../../data/achievements';
import { useLanguage } from '../../hooks/useLanguage';
import ExploreCarousel from '../ui/ExploreCarousel';

const certificateSlides = certificates.map((certificate) => ({
  ...certificate,
  image: certificateUrl(certificate.id, true),
  previewImage: certificateUrl(certificate.id),
}));

export default function OtherSection() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section id="other" aria-labelledby="explore-heading" className="py-12 md:py-16">
      <div className="section">
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <h2 id="explore-heading" className="text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="gradient-text">{t('More to Explore')}</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-6">
          <ExploreCarousel
            title="Achievements"
            slides={achievements}
            containImage
            href="/achievements"
            linkLabel="View All Achievements"
          />
          <ExploreCarousel
            title="Certificates"
            slides={certificateSlides}
            containImage
            href="/certificates"
            linkLabel="View All Certificates"
          />
        </div>
      </div>
    </section>
  );
}
