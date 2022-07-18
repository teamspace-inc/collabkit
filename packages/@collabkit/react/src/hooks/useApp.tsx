import { useContext } from 'react';
import { AppContext, AppContextData } from '../hooks/useAppContext';

export function useApp(): AppContextData {
  const app = useContext(AppContext);
  if (app == null) {
    throw new Error('useApp must be used within a CollabKit.Provider');
  }
  return app;
}
