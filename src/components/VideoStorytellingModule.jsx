import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VideoStorytellingModule = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scenes = [
    {
      id: 1,
      video: 'videos/cnc_laser_cut.mp4',
      title: 'CNC Lazer Kesim',
      description: 'Yüksek hassasiyetli lazer kesim teknolojisi ile metal parçalarınızı mükemmel şekilde işliyoruz.',
      features: [
        '±0.1mm hassasiyet',
        '0.5mm - 25mm kalınlık aralığı',
        'Çelik, paslanmaz, alüminyum',
      ],
      icon: 'icons/icons8-flash-on-100.png',
      cardPosition: { x: '-15%', y: '10%' },
    },
    {
      id: 2,
      video: 'videos/apkant.mp4',
      title: 'Apkant Büküm',
      description: 'Hassas ve karmaşık metal büküm işlemleri için modern CNC Apkant makinelerimizle hizmetinizdeyiz.',
      features: [
        'CNC kontrollü hassas büküm',
        'Karmaşık geometriler',
        'Tekrarlanabilir kalite',
      ],
      icon: 'icons/icons8-brake-discs-100.png',
      cardPosition: { x: '15%', y: '-10%' },
    },
    {
      id: 3,
      video: 'videos/cnc_torna.mp4',
      title: 'CNC Torna',
      description: 'Talaşlı imalat kapasitemizle seri üretim ve özel parça üretiminde uzmanız.',
      features: [
        'Seri ve tekil üretim',
        'Geniş malzeme yelpazesi',
        'Mikron hassasiyeti',
      ],
      icon: 'icons/icons8-gear-100.png',
      cardPosition: { x: '-20%', y: '-5%' },
    },
    {
      id: 4,
      video: 'videos/cnc_freze.mp4',
      title: 'CNC Freze',
      description: 'CNC freze makinelerimizle karmaşık parçaları yüksek hassasiyetle üretiyoruz.',
      features: [
        '3 eksen işleme',
        'Karmaşık geometriler',
        'Yüksek yüzey kalitesi',
      ],
      icon: 'icons/icons8-tools-100.png',
      cardPosition: { x: '18%', y: '8%' },
    },
  ];

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(scenes.length - 1) * 100}vw`]);

  const sceneProgress = scenes.map((_, index) => {
    const start = index / scenes.length;
    const end = (index + 1) / scenes.length;
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  });

  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const newScene = Math.min(
        Math.floor(latest * scenes.length),
        scenes.length - 1
      );
      setActiveScene(newScene);
    });

    return () => unsubscribe();
  }, [scrollYProgress, scenes.length]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex h-full" style={{ x }}>
          {scenes.map((scene, index) => (
            <VideoScene
              key={scene.id}
              scene={scene}
              isActive={activeScene === index}
              progress={sceneProgress[index]}
            />
          ))}
        </motion.div>
        
        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3">
          {scenes.map((_, index) => (
            <motion.div
              key={index}
              className="h-1 bg-primary/30 rounded-full overflow-hidden"
              style={{ width: 60 }}
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{
                  scaleX: index === activeScene ? sceneProgress[index] : index < activeScene ? 1 : 0,
                  transformOrigin: 'left',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VideoScene = ({ scene, isActive, progress }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      video.playbackRate = 0.7;
    };

    video.addEventListener('loadeddata', handleLoadedData);

    if (isActive && isLoaded) {
      video.play().catch((err) => {
        console.log('Video play error:', err);
        const playOnInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener('click', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
      });
    } else {
      video.pause();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isActive, isLoaded]);

  return (
    <motion.div
      className="relative flex-shrink-0 w-screen h-screen flex items-center justify-center"
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={scene.video}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.6) contrast(1.1)' }}
        />
        <div
          className="absolute inset-0 bg-card/20 dark:bg-card/40"
          style={{
            backdropFilter: 'blur(0.5px)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'%2F%3E%3C%2Ffilter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'%2F%3E%3C%2Fsvg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent dark:to-background/90" />
      </div>

      <div
        className="absolute z-10 w-full max-w-2xl px-4 md:px-0"
        style={{
          left: `calc(50% + ${scene.cardPosition.x})`,
          top: `calc(50% + ${scene.cardPosition.y})`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-card/20 dark:bg-card/30 backdrop-blur-xl rounded-3xl p-4 md:p-8 border border-border"
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
        >
          <img src={scene.icon} alt={scene.title} className="mb-6 w-16 h-16" />
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4"
          >
            {scene.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm md:text-lg text-foreground/90 mb-4 md:mb-6 leading-relaxed"
          >
            {scene.description}
          </motion.p>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-3"
          >
            {scene.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex items-center text-foreground/80"
              >
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary mr-2 md:mr-3" />
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoStorytellingModule;

