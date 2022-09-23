import { getProfileColor } from '@collabkit/colors';
import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import * as styles from '../styles/Profile.css';
import { AvatarProps } from '../types';

type ProfileContextValue = {
  profileId: string;
};

export const ProfileContext = React.createContext<ProfileContextValue | null>(null);

function useProfile() {
  const context = React.useContext(ProfileContext);
  if (context == null) {
    throw new Error('[useProfile] Profile context not found');
  }
  const { profileId } = context;
  return { profileId };
}

export function Provider(props: { children: React.ReactNode; profileId: string }) {
  return (
    <ProfileContext.Provider value={{ profileId: props.profileId }}>
      {props.children}
    </ProfileContext.Provider>
  );
}

export function Name(props: React.ComponentPropsWithoutRef<'span'>) {
  const { store } = useApp();
  const { profiles } = useSnapshot(store);
  const { profileId } = useProfile();
  const profile = profiles[profileId];
  return (
    <span {...props} className={props.className ?? styles.name}>
      {profile?.name ?? profile?.email ?? 'Anonymous'}
    </span>
  );
}

export function Avatar({
  size,
  ...props
}: { size?: number } & React.ComponentPropsWithoutRef<'div'>) {
  const { store, renderAvatar } = useApp();
  const { profiles } = useSnapshot(store);
  const { profileId } = useProfile();
  const profile = profiles[profileId];

  const [didError, setDidError] = useState(false);

  if (profile == null) {
    return null;
  }

  if (renderAvatar != null) {
    return <>{renderAvatar({ profile, size })}</>;
  }

  return didError || !profile?.avatar ? (
    <div
      {...props}
      className={props.className ?? styles.avatar}
      style={{
        ...(size ? { width: size, height: size, lineHeight: `${size}px` } : {}),
        ...(profile.color
          ? {
              backgroundColor: getProfileColor(profile.color),
            }
          : {}),
      }}
    >
      {profile.name?.charAt(0)}
    </div>
  ) : (
    <img
      src={profile.avatar}
      className={props.className ?? styles.avatar}
      {...props}
      style={{ ...(size ? { width: size, height: size, lineHeight: `${size}px` } : {}) }}
      onError={() => setDidError(true)}
    />
  );
}
