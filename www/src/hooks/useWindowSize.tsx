import React from 'react';

const WINDOW_RESIZE_DEBOUNCE_WAIT_IN_MS = 100;

export type Breakpoint = 'small' | 'medium' | 'large' | 'xlarge';

export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState<
    { width: number; height: number; breakpoint: Breakpoint } | undefined
  >(undefined);

  React.useEffect(() => {
    let debounceTimerId: number;

    function updateWindowSize() {
      let breakpoint: Breakpoint = 'small';

      if (window.innerWidth > 500) {
        breakpoint = 'medium';
      }

      if (window.innerWidth > 600) {
        breakpoint = 'large';
      }

      if (window.innerWidth > 1440) {
        breakpoint = 'xlarge';
      }

      setWindowSize({ width: window.innerWidth, height: window.innerHeight, breakpoint });
    }

    function handleResize() {
      window.clearTimeout(debounceTimerId);
      debounceTimerId = window.setTimeout(updateWindowSize, WINDOW_RESIZE_DEBOUNCE_WAIT_IN_MS);
    }

    updateWindowSize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
