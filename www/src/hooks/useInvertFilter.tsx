import { useEffect, useRef } from 'react';

export function useInvertFilter(props: { setInvertFilter: (invertFilter: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < 0 && rect.top > -rect.height) {
          props.setInvertFilter(1);
        } else {
          props.setInvertFilter(0);
        }
      }
    };
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);
  return { ref };
}
