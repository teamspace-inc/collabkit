import { useEffect } from 'react';
import { store } from './App';

export function Logout() {
  useEffect(() => {
    store.user = null;
  }, []);

  return <div>Logged out</div>;
}
