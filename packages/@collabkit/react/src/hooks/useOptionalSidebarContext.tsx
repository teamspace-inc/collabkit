import { createContext, useContext } from 'react';

export const SidebarContext = createContext<{ titleHeight: number }>({ titleHeight: 0 });

export function useOptionalSidebarContext() {
  const context = useContext(SidebarContext);
  return context;
}
