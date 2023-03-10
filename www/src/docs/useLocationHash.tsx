import { useEffect, useState } from 'react';

export function useLocationHash() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    addEventListener('hashchange', (event) => {
      setHash(window.location.hash);
    });
  }, []);
  return hash;
}
