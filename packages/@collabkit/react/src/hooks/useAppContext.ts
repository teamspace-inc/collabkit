import { createContext, ReactNode } from 'react';
import type { Events } from '@collabkit/client';
import type { Store, ThreadInfo } from '@collabkit/core';
import { AvatarProps } from '../types';

export type AppContextValue = {
  store: Store;
  events: Events;
  renderAvatar?: (props: AvatarProps) => ReactNode;
  renderThreadContextPreview?: (props: {
    threadId: string;
    workspaceId: string;
    userId: string;
    info?: ThreadInfo;
  }) => ReactNode;
};

export const AppContext = createContext<AppContextValue | null>(null);
