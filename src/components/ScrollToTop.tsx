import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useLayoutEffect(() => {
    const scrollTarget = (state as { scrollTo?: string } | null)?.scrollTo;

    if (scrollTarget) {
      const timeout = setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'instant' });
        }
      }, 150);
      return () => clearTimeout(timeout);
    }

    // Aggressively scroll to top at multiple intervals to override Lenis
    scrollToTop();
    const t1 = setTimeout(scrollToTop, 0);
    const t2 = setTimeout(scrollToTop, 50);
    const t3 = setTimeout(scrollToTop, 150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, state]);

  return null;
}

export default ScrollToTop;
