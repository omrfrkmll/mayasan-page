import { useState, useEffect } from 'react';

export const useAutoHideNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 400; // Adjust this value as needed

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > scrollThreshold) {
          // if scroll down hide the navbar after threshold
          setShowNavbar(false);
        } else if (window.scrollY < lastScrollY) {
          // if scroll up show the navbar
          setShowNavbar(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return { showNavbar };
};