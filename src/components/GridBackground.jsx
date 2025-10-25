import { motion } from 'framer-motion';

export const GridBackground = () => {
  return (
    
    <motion.div
      className="absolute inset-0 opacity-20 invert dark:invert-1"
      style={{
        backgroundImage: 'url(/grid-background.svg)',
        // backgroundSize: '40px 40px',
        filter: 'var(--grid-filter)',
        maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)',
      }}
      animate={{
        backgroundPosition: ['0px 0px', '0px 0px'],
      }}
      transition={{
        duration: 0,
        repeat: 0,
        ease: 'linear',
      }}
    />
  );
};
 {/* <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5" style={{ backgroundImage: "url(/grid-background.svg)", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "300px 300px" }}></div> */}