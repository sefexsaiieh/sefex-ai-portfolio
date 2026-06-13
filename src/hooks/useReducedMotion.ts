import { useCallback, useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(QUERY).matches;
  });

  const handleChange = useCallback((event: MediaQueryListEvent) => {
    setPrefersReduced(event.matches);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [handleChange]);

  return prefersReduced;
}
