import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassmorphismIcon from '../components/GlassmorphismIcon';

// Demo data for services
const serviceDetails = {
  'apkant-bukum': {
    title: 'Apkant Büküm Hizmetleri',
    description: 'Hassas ve karmaşık metal büküm işlemleri için modern CNC Apkant makinelerimizle hizmetinizdeyiz. Geniş malzeme yelpazesi ve yüksek tekrarlanabilirlik ile projelerinize değer katıyoruz.',
   image: 
'videos/apkant.mp4',
    features: [
      'Yüksek hassasiyetli CNC kontrol',
      'Geniş malzeme bükme kapasitesi (çelik, paslanmaz, alüminyum)',
      'Farklı kalınlıklarda ve uzunluklarda büküm',
      'Karmaşık geometrilerin üretimi',
      'Hızlı ve verimli üretim süreçleri',
    ],
    benefits: [
      'Maliyet etkin çözümler',
      'Kısa teslimat süreleri',
      'Üstün ürün kalitesi',
      'Özelleştirilmiş büküm çözümleri',
    ],
  },
  'cnc-lazer-kesim': {
    title: 'CNC Lazer Kesim Hizmetleri',
    description: 'Yüksek hassasiyetli ve hızlı lazer kesim teknolojisi ile metal parçalarınızı mükemmel şekilde işliyoruz. Fiber lazer kesim makinelerimizle en ince detayları bile kusursuzca kesiyoruz.',
   image: 
'videos/cnc_laser_cut.mp4',
    features: [
      'Fiber lazer teknolojisi ile yüksek kesim hızı',
      'Çelik, paslanmaz çelik, alüminyum, bakır gibi farklı metallerin kesimi',
      '0.5 mm’den 25 mm’ye kadar kesim kalınlığı',
      'Minimum malzeme kaybı ile ekonomik üretim',
      'Karmaşık ve detaylı kesimler',
    ],
    benefits: [
      'Üstün kesim kalitesi ve pürüzsüz yüzeyler',
      'Hızlı prototipleme ve seri üretim',
      'Tasarım esnekliği ve detay hassasiyeti',
      'Maliyet ve zaman tasarrufu',
    ],
  },
  'gaz-alti-kaynak': {
    title: 'Gaz Altı Kaynak (MIG/MAG) Hizmetleri',
    description: 'MIG/MAG kaynak yöntemleriyle dayanıklı ve estetik kaynak çözümleri sunuyoruz. Deneyimli ekibimiz ve modern ekipmanlarımızla her türlü kaynak ihtiyacınıza profesyonel çözümler üretiyoruz.',
   image: 
'videos/welding.mp4',
    features: [
      'MIG (Metal Inert Gas) ve MAG (Metal Active Gas) kaynak yöntemleri',
      'Çelik, paslanmaz çelik ve alüminyum kaynakları',
      'Yüksek mukavemetli ve estetik kaynak dikişleri',
      'Tecrübeli ve sertifikalı kaynak ekibi',
      'Geniş uygulama alanı (konstrüksiyon, makine parçaları, vb.)',
    ],
    benefits: [
      'Dayanıklı ve uzun ömürlü ürünler',
      'Hızlı ve verimli kaynak süreçleri',
      'Yüksek kaliteli işçilik',
      'Farklı projeler için esnek çözümler',
    ],
  },
};

const getIconForFeature = (feature) => {
  if (feature.includes('hassasiyet')) return <GlassmorphismIcon src="icons/icons8-gear-100.png" alt="hassasiyet" className="w-5 h-5 text-primary" />;
  if (feature.includes('kesim')) return <GlassmorphismIcon src="icons/icons8-flash-on-100.png" alt="kesim" className="w-5 h-5 text-primary" />;
  if (feature.includes('kaynak')) return <GlassmorphismIcon src="icons/icons8-gas-100.png" alt="kaynak" className="w-5 h-5 text-primary" />;
  return <GlassmorphismIcon src="icons/icons8-tools-100.png" alt="genel" className="w-5 h-5 text-primary" />;
};

export const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    if (serviceSlug && serviceDetails[serviceSlug]) {
      setService(serviceDetails[serviceSlug]);
    } else {
      // Handle 404 or redirect if service not found
      setService(null);
    }
  }, [serviceSlug]);

  if (!service) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Hizmet Bulunamadı</h1>
        <p className="text-lg text-foreground/70 mb-8">Aradığınız hizmet mevcut değil veya yanlış bir bağlantı kullandınız.</p>
        <Link to="/services">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Tüm Hizmetlere Geri Dön
            </button>
          </motion.div>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-24 sm:pt-32 pb-16"
    >
      {/* Hero Section for Service Detail */}
      <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
        <video
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loop
          muted
          playsInline
          autoPlay
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-center pb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-center drop-shadow-lg">
            {service.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-foreground/80 leading-relaxed mb-10 text-center"
          >
            {service.description}
          </motion.p>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-card/50 backdrop-blur-lg border border-border/50 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4">Özellikler</h2>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-foreground/70">
                    {getIconForFeature(feature)}
                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Section */}
            <div className="bg-card/50 backdrop-blur-lg border border-border/50 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4">Faydaları</h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-foreground/70">
                    {getIconForFeature(benefit)}
                    <span className="ml-3">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="px-8 rounded-xl backdrop-blur-sm">
                  Hizmetlerimiz Hakkında Teklif Alın
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
