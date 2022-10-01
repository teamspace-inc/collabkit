import React, { createContext, useContext } from 'react';

const WINDOW_RESIZE_DEBOUNCE_WAIT_IN_MS = 100;

export type Breakpoint = 'small' | 'medium' | 'large' | 'xlarge';

function getBreakpoint() {
  let breakpoint: Breakpoint = 'small';

  if (window.innerWidth > 640) {
    breakpoint = 'medium';
  }

  if (window.innerWidth > 960) {
    breakpoint = 'large';
  }

  if (window.innerWidth > 1440) {
    breakpoint = 'xlarge';
  }

  return breakpoint;
}

const BreakpointContext = createContext<Breakpoint>(
  typeof window !== 'undefined' ? getBreakpoint() : 'small'
);

export function SetBreakpointContext(props: { children: React.ReactNode }) {
  const size = useWindowSize();
  return (
    <BreakpointContext.Provider value={size?.breakpoint ?? 'small'}>
      {props.children}
    </BreakpointContext.Provider>
  );
}

export function useBreakpoint() {
  return useContext(BreakpointContext);
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState<
    { width: number; height: number; breakpoint: Breakpoint } | undefined
  >(undefined);

  React.useEffect(() => {
    let debounceTimerId: number;

    function updateWindowSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getBreakpoint(),
      });
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
