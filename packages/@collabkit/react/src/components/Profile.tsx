import { actions } from '@collabkit/client';
import { getProfileColor } from '@collabkit/colors';
import { Profile } from '@collabkit/core';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import * as styles from '../styles/Profile.css';

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

function AvatarPlaceholder({
  size,
  profile,
  ...props
}: { size?: number; profile: Profile } & React.ComponentPropsWithoutRef<'div'>) {
  return (
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
  );
}

export function Avatar({
  size,
  ...props
}: { size?: number } & React.ComponentPropsWithoutRef<'div'>) {
  const { store, renderAvatar } = useApp();
  const { profiles, avatarErrors } = useSnapshot(store);
  const { profileId } = useProfile();
  const profile = profiles[profileId];

  if (profile == null) {
    return null;
  }

  if (renderAvatar != null) {
    return <>{renderAvatar({ profile, size })}</>;
  }

  const avatar = profile.avatar;

  if (!avatar) {
    return <AvatarPlaceholder size={size} profile={profile} />;
  }

  return avatarErrors[avatar] ? (
    <AvatarPlaceholder size={size} profile={profile} />
  ) : (
    <img
      src={profile.avatar}
      className={props.className ?? styles.avatar}
      {...props}
      style={{ ...(size ? { width: size, height: size, lineHeight: `${size}px` } : {}) }}
      onError={() => actions.setAvatarError(store, { avatar })}
    />
  );
}
