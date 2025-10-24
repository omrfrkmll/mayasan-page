import { Moon, Sun, ShoppingCart, User } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { isUserFeaturesEnabled, isEcommerceEnabled } from '../config/features';

export const Header = () => {
  return (
    // <header className="sticky top-0 z-50 bg-background shadow-md">
      <header className="relative z-50 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center gap-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-wider">
                MA-YA-SAN
              </span>
            </Link>
          </motion.div>


        </div>
      </div>
    </header>
  );
};