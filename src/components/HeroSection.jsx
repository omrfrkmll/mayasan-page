import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sectionRef = useRef(null);

  // Mouse paralaks efekti için
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 3D paralaks transformları
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const translateZ = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 dark:invert-1">
        <div
          className="absolute inset-0 opacity-35 pointer-events-none dark:invert"
          style={{
            backgroundImage: "url(/noise.webp), url(/grid-background.svg)",
            backgroundSize: "auto, cover",
            backgroundPosition: "0 0, center",
            backgroundRepeat: "repeat, no-repeat",
            maskImage:
              "radial-gradient(ellipse 70% 50% at center, black 40%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50% at center, black 40%, transparent 70%)",
            filter: "blur(0.5px)",
          }}
        />
      </div>

      {/* 3D Metal Parça (Paralaks Efekti) */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 opacity-30 pointer-events-none"
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary/40 to-accent/40 backdrop-blur-sm border border-primary/20 shadow-2xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 opacity-20 pointer-events-none"
        style={{
          rotateX: useTransform(rotateX, (v) => -v),
          rotateY: useTransform(rotateY, (v) => -v),
          translateZ: useTransform(translateZ, (v) => -v),
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-accent/40 to-primary/40 backdrop-blur-sm border border-accent/20 shadow-2xl" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground/80">
              Hassas Metal İşleme Çözümleri
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              Metal İşlemede
            </span>
            <br />
            <span className="">Yenilikçi Çözümler</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Apkant bükümden CNC lazer kesime, gaz altı kaynaktan özel imalata
            kadar tüm metal işleme ihtiyaçlarınızda güvenilir ortağınız.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/services">
                <Button
                  size="lg"
                  className="group px-8 py-6 text-lg rounded-xl shadow-lg"
                >
                  Hizmetlerimizi Keşfet
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                >
                  Teklif Alın
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: "20+", label: "Yıllık Tecrübe" },
              { value: "500+", label: "Tamamlanan Proje" },
              { value: "99%", label: "Müşteri Memnuniyeti" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-foreground/50 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
