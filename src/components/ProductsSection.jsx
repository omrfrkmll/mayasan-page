import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { Zap, Shield, Layers, Sparkles, Factory, Flame, Scissors } from 'lucide-react';

export const ProductsSection = () => {
  const products = [
    {
      title: 'Apkant Büküm',
      description: 'Hassas ve karmaşık metal büküm işlemleri için modern CNC Apkant makinelerimizle hizmetinizdeyiz.',
      icon: Factory,
      link: '/services/apkant-bukum',
    },
    {
      title: 'CNC Lazer Kesim',
      description: 'Yüksek hassasiyetli ve hızlı lazer kesim teknolojisi ile metal parçalarınızı mükemmel şekilde işliyoruz.',
      icon: Scissors,
      link: '/services/cnc-lazer-kesim',
    },
    {
      title: 'Gaz Altı Kaynak',
      description: 'MIG/MAG kaynak yöntemleriyle dayanıklı ve estetik kaynak çözümleri sunuyoruz.',
      icon: Flame,
      link: '/services/gaz-alti-kaynak',
    },
    {
      title: 'Özel İmalat',
      description: 'Müşteriye özel çözümler ve projeler için esnek ve yenilikçi imalat hizmetleri sunuyoruz.',
      icon: Sparkles,
      link: '/contact',
    },
  ];

  return (
    <section id="products" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">Hizmetlerimiz</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Metal İşleme Çözümlerimiz
            </span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            İhtiyaçlarınıza özel, yüksek kaliteli ve hassas metal işleme hizmetleri sunuyoruz.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description={product.description}
              icon={product.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

