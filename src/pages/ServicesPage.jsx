import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlassmorphismIcon from '../components/GlassmorphismIcon';

const services = [
  {
    title: 'Apkant Büküm',
    description: 'Hassas ve karmaşık metal büküm işlemleri için modern CNC Apkant makinelerimizle hizmetinizdeyiz.',
    icon: '/icons/icons8-brake-discs-100.png',
    link: '/services/apkant-bukum',
  },
  {
    title: 'CNC Lazer Kesim',
    description: 'Yüksek hassasiyetli ve hızlı lazer kesim teknolojisi ile metal parçalarınızı mükemmel şekilde işliyoruz.',
    icon: '/icons/icons8-flash-on-100.png',
    link: '/services/cnc-lazer-kesim',
  },
  {
    title: 'Gaz Altı Kaynak',
    description: 'MIG/MAG kaynak yöntemleriyle dayanıklı ve estetik kaynak çözümleri sunuyoruz.',
    icon: '/icons/icons8-gas-100.png',
    link: '/services/gaz-alti-kaynak',
  },
];

export const ServicesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
    >
      <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Hizmetlerimiz
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <Link to={service.link} className="block h-full">
              <div className="relative h-full p-8 rounded-3xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
                <div className="absolute inset-0 opacity-[0.02] bg-noise pointer-events-none" />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none"
                />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 mb-6 relative z-10"
                >
                  <GlassmorphismIcon src={service.icon} alt={service.title} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-foreground relative z-10">
                  {service.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-6 relative z-10">
                  {service.description}
                </p>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
