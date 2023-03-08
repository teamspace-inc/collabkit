import { useContext } from 'react';
import { AppContext, AppContextValue } from './useAppContext';

export function useApp(): AppContextValue {
  const app = useContext(AppContext);
  if (app == null) {
    throw new Error('useApp must be used within a CollabKitProvider');
  }
  return app;
}
