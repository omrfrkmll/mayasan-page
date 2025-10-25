import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAutoHideNavbar } from '../hooks/useAutoHideNavbar';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hakkımızda', href: '/about' },
  { label: 'Hizmetler', href: '/services' },
  { label: 'Ürünler', href: '/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/contact' },
];

export const Navbar = ({ onHeightChange }) => {
  const { showNavbar } = useAutoHideNavbar();
  const { scrollY } = useScrollPosition();
  const isAtTop = scrollY < 50;
  const navbarRef = useRef(null);

  useEffect(() => {
    if (navbarRef.current && onHeightChange) {
      onHeightChange(navbarRef.current.offsetHeight);
    }
  }, [onHeightChange, showNavbar, isAtTop]); // Recalculate if layout changes

  return (
    <motion.div
      className="flex justify-center fixed top-4 z-50 transition-all duration-50 max-w-fit left-1/2 transform -translate-x-1/2 md:flex"
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ delay: showNavbar ? 0 : 0.2 }}
    >
      <nav
        className="flex flex-col md:flex-row items-center p-2 rounded-lg bg-background/50 backdrop-blur-lg border border-border shadow-lg"
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
          >
            <Link to={item.href}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-primary/10"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};
