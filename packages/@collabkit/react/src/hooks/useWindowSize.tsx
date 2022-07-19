import React from 'react';

const WINDOW_RESIZE_DEBOUNCE_WAIT_IN_MS = 100;

export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState<{ width: number; height: number } | undefined>(
    undefined
  );

  React.useEffect(() => {
    let debounceTimerId: number;

    function updateWindowSize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
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
