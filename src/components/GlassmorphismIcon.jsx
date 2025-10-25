import { motion } from 'framer-motion';

const GlassmorphismIcon = ({ Icon, src, alt, isActive, className = '' }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0.5 }}
      animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      {Icon && <Icon className="w-8 h-8 text-white" />}
      {src && <img src={src} alt={alt} className="w-8 h-8" />}
    </motion.div>
  );
};

export default GlassmorphismIcon;

