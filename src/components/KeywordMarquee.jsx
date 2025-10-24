import { motion } from 'framer-motion';
// import { ... } from 'lucide-react';
// import GlassmorphismIcon from './GlassmorphismIcon';

const KeywordMarquee = () => {
  const keywords = [
    { text: 'CNC Lazer Kesim', icon: '/icons/icons8-flash-on-100.png' },
    { text: 'Apkant Büküm', icon: '/icons/icons8-brake-discs-100.png' },
    { text: 'CNC Torna', icon: '/icons/icons8-gear-100.png' },
    { text: 'CNC Freze', icon: '/icons/icons8-tools-100.png' },
    { text: 'Gaz Altı Kaynak', icon: '/icons/icons8-gas-100.png' },
    { text: 'Metal İşleme', icon: '/icons/icons8-factory-100.png' },
    { text: 'Özel İmalat', icon: '/icons/icons8-archive-list-of-parts-100.png' },
    { text: 'Hassas Kesim', icon: '/icons/icons8-cut-100.png' },
    { text: 'Seri Üretim', icon: '/icons/icons8-manufacturing-100.png' },
    { text: 'Kalite Kontrol', icon: '/icons/icons8-check-mark-100.png' },
  ];

  // Keywordleri 2 kez tekrarla (seamless loop için)
  const repeatedKeywords = [...keywords, ...keywords];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-background via-card to-background dark:from-background dark:via-card dark:to-background py-8 border-y border-border">
      {/* Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background dark:from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background dark:from-background to-transparent z-10 pointer-events-none" />

      {/* Animated Marquee */}
      <motion.div
        className="flex gap-16 items-center"
        animate={{
          x: [0, -50 + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 40,
            ease: 'linear',
          },
        }}
      >
        {repeatedKeywords.map((item, index) => {
//           const Icon = item.icon;
          return (
            <div key={index} className="flex items-center gap-16 flex-shrink-0">
              {/* Keyword */}
              <div className="flex items-center justify-center px-6 py-3 bg-card dark:bg-card rounded-full shadow-md border border-border hover:shadow-lg transition-shadow duration-300">
                <span className="text-lg font-semibold text-foreground dark:text-foreground whitespace-nowrap">
                  {item.text}
                </span>
              </div>

              {/* Icon */}
              <img src={item.icon} alt={item.text} className="w-12 h-12" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default KeywordMarquee;

