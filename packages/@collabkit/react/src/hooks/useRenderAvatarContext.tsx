import React, { ReactNode } from 'react';
import { AvatarProps } from '../types';

export type CustomAvatar = (props: AvatarProps) => ReactNode;

export const CustomAvatarContext = React.createContext<CustomAvatar | undefined>(undefined);

export function CustomAvatarProvider({
  children,
  renderAvatar,
}: {
  children: ReactNode;
  renderAvatar?: CustomAvatar;
}) {
  if (!renderAvatar) {
    return <>{children}</>;
  }
  return (
    <CustomAvatarContext.Provider value={renderAvatar}>{children}</CustomAvatarContext.Provider>
  );
}

export function useCustomAvatar() {
  return React.useContext(CustomAvatarContext);
}
