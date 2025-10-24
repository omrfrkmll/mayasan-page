import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ProductCard = ({ title, description, icon: Icon, link, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link to={link} className="block h-full">
        {/* Card Container with Glassmorphism */}
        <div className="relative h-full p-8 rounded-3xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
          {/* Noisy Background */}
          <div className="absolute inset-0 opacity-[0.02] bg-noise pointer-events-none" />
          
          {/* Gradient Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none"
          />

          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-6 relative z-10"
          >
            <Icon className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Content */}
          <h3 className="text-2xl font-bold mb-3 text-foreground relative z-10">
            {title}
          </h3>
          <p className="text-foreground/70 leading-relaxed mb-6 relative z-10">
            {description}
          </p>

          {/* Learn More Link */}
          <motion.div
            className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors relative z-10"
            whileHover={{ x: 5 }}
          >
            <span>Daha Fazla</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.div>

          {/* Decorative Corner Gradient */}
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  )
}

