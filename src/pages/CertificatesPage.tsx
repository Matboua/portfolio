import PortfolioSubpage from '../components/layout/PortfolioSubpage';
import ImageGallery from '../components/ui/ImageGallery';
import { certificates, certificateUrl } from '../data/achievements';
import { useLanguage } from '../hooks/useLanguage';

const certificateImages = certificates.map((certificate) => ({
  ...certificate,
  image: certificateUrl(certificate.id),
  thumbnail: certificateUrl(certificate.id, true),
}));

export default function CertificatesPage() {
  const { t } = useLanguage();

  return (
    <PortfolioSubpage
      title={t('My Certificates')}
      description={t('Certificates from my internship, cybersecurity training, and German studies.')}
    >
      <ImageGallery items={certificateImages} openLabel="View certificate" closeLabel="Close certificate" />
    </PortfolioSubpage>
  );
}
