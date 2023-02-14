import { useEffect } from 'react';
import { store } from './store';

export function Logout() {
  useEffect(() => {
    store.user = null;
  }, []);

  return <div>Logged out</div>;
}
