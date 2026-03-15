import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top of window
    window.scrollTo(0, 0);
    
    // Also scroll body/html just in case
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    
    // If Lenis is active, it might need an extra push
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
