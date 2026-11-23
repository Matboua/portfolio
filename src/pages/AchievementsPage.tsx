import PortfolioSubpage from '../components/layout/PortfolioSubpage';
import ImageGallery from '../components/ui/ImageGallery';
import { achievements } from '../data/achievements';
import { useLanguage } from '../hooks/useLanguage';

export default function AchievementsPage() {
  const { t } = useLanguage();

  return (
    <PortfolioSubpage title={t('My Achievements')} description={t('Personal milestones in education, sport, and hands-on learning.')}>
      <ImageGallery items={achievements} />
    </PortfolioSubpage>
  );
}
