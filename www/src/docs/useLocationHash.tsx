import { useEffect, useState } from 'react';

export function useLocationHash() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    addEventListener('hashchange', onChange);
    return () => {
      removeEventListener('hashchange', onChange);
    };
  }, []);
  return hash;
}
