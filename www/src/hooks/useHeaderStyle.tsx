import { useEffect, useRef } from 'react';
import { store } from '../home/Header';

export function useHeaderStyle(props: { theme: 'light' | 'dark'; backgroundColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < 0 && rect.top > -rect.height) {
          store.backgroundColor = props.backgroundColor;
          store.theme = props.theme;
          // props.setInvertFilter(1);
        }
      }
    };
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);
  return { ref };
}
