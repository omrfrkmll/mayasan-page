import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const useSmoothScroll = () => {
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
      });

      return () => {
        if (smoother) {
          smoother.kill();
        }
      };
    }
  }, []);
};

export default useSmoothScroll;

