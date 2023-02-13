import React from 'react';

export const ChannelContext = React.createContext<string | null>(null);

export function useChannelContext() {
  const context = useOptionalChannelContext();

  if (!context) {
    throw new Error('useChannelContext must be used within a ChannelContext');
  }

  return context;
}

export function useOptionalChannelContext() {
  return React.useContext(ChannelContext);
}
