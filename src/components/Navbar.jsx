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

export const Navbar = () => {
  const { showNavbar } = useAutoHideNavbar();
  const { scrollY } = useScrollPosition();
  const isAtTop = scrollY < 50;

  return (
    <motion.div
      className="hidden md:flex justify-center fixed top-4 z-40 transition-all duration-50 max-w-fit left-1/2 transform -translate-x-1/2"
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ delay: showNavbar ? 0 : 0.2 }}
    >
      <nav
        className="flex items-center p-2 rounded-lg bg-background/80 backdrop-blur-lg border border-border shadow-lg"
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            animate={{ marginLeft: isAtTop ? (index === 0 ? 0 : 8) : (index === 0 ? 0 : 32) }}
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
