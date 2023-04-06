import { useEffect } from 'react';
import { store } from './store';

export function Logout() {
  useEffect(() => {
    store.token = null;
  }, []);

  return <div>Logged out</div>;
}
