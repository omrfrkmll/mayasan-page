import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LaserCuttingScene } from './storytelling/LaserCuttingScene';
import { BendingScene } from './storytelling/BendingScene';
import { CNCScene } from './storytelling/CNCScene';

// GSAP ScrollTrigger'ı kaydet
gsap.registerPlugin(ScrollTrigger);

export const ScrollStorytellingModule = () => {
  const containerRef = useRef(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // WebGL desteğini kontrol et
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLSupported(!!gl);
    } catch (e) {
      setIsWebGLSupported(false);
    }
  }, []);

  // Scroll-driven animasyonlar için GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Faz 1: Lazer Kesim (0-33%)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '33% top',
        onUpdate: (self) => {
          if (self.progress > 0 && self.progress < 1) {
            setCurrentPhase(0);
          }
        },
        scrub: true,
      });

      // Faz 2: Apkant Büküm (33-66%)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: '33% top',
        end: '66% top',
        onUpdate: (self) => {
          if (self.progress > 0 && self.progress < 1) {
            setCurrentPhase(1);
          }
        },
        scrub: true,
      });

      // Faz 3: CNC Torna & Freze (66-100%)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: '66% top',
        end: 'bottom top',
        onUpdate: (self) => {
          if (self.progress > 0 && self.progress < 1) {
            setCurrentPhase(2);
          }
        },
        scrub: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Fallback: WebGL desteklenmiyorsa
  if (!isWebGLSupported) {
    return (
      <section className="relative py-24 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Üretim Süreçlerimiz
              </span>
            </h2>
            <p className="text-lg text-foreground/70">
              Modern teknoloji ve deneyimli ekibimizle mükemmel sonuçlar üretiyoruz.
            </p>
          </div>

          {/* Fallback: Statik görsel ve metin içeriği */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50">
              <div className="w-full h-48 bg-muted rounded-lg mb-4" />
              <h3 className="text-2xl font-bold mb-2">CNC Lazer Kesim</h3>
              <p className="text-foreground/70">
                Yüksek hassasiyetli lazer kesim teknolojisi ile metal parçalarınızı mükemmel şekilde işliyoruz.
              </p>
            </div>
            <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50">
              <div className="w-full h-48 bg-muted rounded-lg mb-4" />
              <h3 className="text-2xl font-bold mb-2">Apkant Büküm</h3>
              <p className="text-foreground/70">
                Hassas ve karmaşık metal büküm işlemleri için modern CNC Apkant makinelerimizle hizmetinizdeyiz.
              </p>
            </div>
            <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50">
              <div className="w-full h-48 bg-muted rounded-lg mb-4" />
              <h3 className="text-2xl font-bold mb-2">CNC Torna & Freze</h3>
              <p className="text-foreground/70">
                Talaşlı imalat kapasitemizle seri üretim ve özel parça üretiminde uzmanız.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative h-[400vh] bg-background"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Scene Container */}
        <div className="absolute inset-0">
          {currentPhase === 0 && <LaserCuttingScene />}
          {currentPhase === 1 && <BendingScene />}
          {currentPhase === 2 && <CNCScene />}
        </div>

        {/* Text Content Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-8 sm:pr-16 lg:pr-24">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="max-w-md p-8 rounded-2xl backdrop-blur-xl bg-card/80 border border-border/50 shadow-2xl"
          >
            {currentPhase === 0 && (
              <>
                <h3 className="text-3xl font-bold mb-4">CNC Lazer Kesim</h3>
                <p className="text-foreground/80 mb-4">
                  Yüksek hassasiyetli lazer kesim teknolojisi ile metal parçalarınızı mükemmel şekilde işliyoruz.
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li>• ±0.1mm hassasiyet</li>
                  <li>• 0.5mm - 25mm kalınlık aralığı</li>
                  <li>• Çelik, paslanmaz, alüminyum</li>
                </ul>
              </>
            )}
            {currentPhase === 1 && (
              <>
                <h3 className="text-3xl font-bold mb-4">Apkant Büküm</h3>
                <p className="text-foreground/80 mb-4">
                  Hassas ve karmaşık metal büküm işlemleri için modern CNC Apkant makinelerimizle hizmetinizdeyiz.
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li>• CNC kontrollü hassas büküm</li>
                  <li>• Karmaşık geometriler</li>
                  <li>• Tekrarlanabilir kalite</li>
                </ul>
              </>
            )}
            {currentPhase === 2 && (
              <>
                <h3 className="text-3xl font-bold mb-4">CNC Torna & Freze</h3>
                <p className="text-foreground/80 mb-4">
                  Talaşlı imalat kapasitemizle seri üretim ve özel parça üretiminde uzmanız.
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Seri ve tekil üretim</li>
                  <li>• Geniş malzeme yelpazesi</li>
                  <li>• Mikron hassasiyeti</li>
                </ul>
              </>
            )}
          </motion.div>
        </div>

        {/* Phase Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                currentPhase === index ? 'bg-primary w-16' : 'bg-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

