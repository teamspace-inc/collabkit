import React from 'react';

type ChannelContextValue = { workspaceId: string; channelId: 'default' };

export const ChannelContext = React.createContext<ChannelContextValue | null>(null);

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
