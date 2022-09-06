import { useContext } from 'react';
import { AppContext, AppContextValue } from '../hooks/useAppContext';

export function useApp(): AppContextValue {
  const app = useContext(AppContext);
  if (app == null) {
    throw new Error('useApp must be used within a CollabKit.Provider');
  }
  return app;
}
