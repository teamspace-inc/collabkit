import React from 'react';

export const ObjectContext = React.createContext<{ objectId: string } | null>(null);

export function useObjectContext() {
  const context = React.useContext(ObjectContext);
  if (!context) {
    throw new Error('useObjectContext must be used within a ObjectContext');
  }
  return context;
}
