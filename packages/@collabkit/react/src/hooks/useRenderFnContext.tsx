import { ThreadInfo } from '@collabkit/core';
import React, { ReactNode } from 'react';
import { AvatarProps } from '../types';

export type RenderFnContextValue = {
  renderAvatar?: (props: AvatarProps) => ReactNode;
  renderThreadContextPreview?: (props: {
    threadId: string;
    workspaceId: string;
    userId: string;
    info?: ThreadInfo;
  }) => ReactNode;
};
export const RenderFnContext = React.createContext<RenderFnContextValue>({});

export function useRenderFnContext() {
  return React.useContext(RenderFnContext);
}
