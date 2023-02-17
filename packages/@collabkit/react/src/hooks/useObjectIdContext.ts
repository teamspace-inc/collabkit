import React from 'react';

export const ObjectIdContext = React.createContext<string | null>(null);

export function useObjectIdContext(): string {
  const context = React.useContext(ObjectIdContext);
  if (!context) {
    throw new Error('ObjectIdContext not found');
  }
  return context;
}
