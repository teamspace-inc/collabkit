import { actions } from '@collabkit/client';
import type { Profile as ProfileType } from '@collabkit/core';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';
import * as styles from '../theme/components/Profile.css';
import { vars } from '../theme/theme/index.css';
import { ProfileContext, useProfile } from '../hooks/useProfile';
import { useRenderFnContext } from '../hooks/useRenderFnContext';

export function ProfileProvider(props: { children: React.ReactNode; profileId: string }) {
  return (
    <ProfileContext.Provider value={props.profileId}>{props.children}</ProfileContext.Provider>
  );
}

export function ProfileName(props: React.ComponentPropsWithoutRef<'span'>) {
  const store = useStore();
  const profileId = useProfile();
  const profiles = useSnapshot(store.profiles);
  const profile = profiles[profileId];
  return (
    <span {...props} className={props.className ?? styles.name}>
      {profile?.name ?? profile?.email}
    </span>
  );
}

function AvatarPlaceholder({
  size,
  profile,
  ...props
}: { size?: string; profile: ProfileType } & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={props.className ?? styles.avatar}
      style={{
        ...(size ? { width: size, height: size, lineHeight: size } : {}),
        ...(profile.color
          ? {
              backgroundColor: vars.avatar.colors[profile.color],
            }
          : {}),
      }}
    >
      {profile.name?.charAt(0)}
    </div>
  );
}

export function ProfileNumberedAvatarPlaceholder({
  size,
  number,
  ...props
}: {
  number: number;
  className?: string;
  size?: string;
}) {
  return (
    <div
      {...props}
      className={props.className ?? styles.avatar}
      style={{
        ...(size ? { width: size, height: size, lineHeight: size } : {}),
      }}
    >
      {number}
    </div>
  );
}

export function ProfileAvatar({
  size,
  ...props
}: { size?: string } & React.ComponentPropsWithoutRef<'div'>) {
  const store = useStore();
  const { renderAvatar } = useRenderFnContext();
  const { profiles, avatarErrors } = useSnapshot(store);
  const profileId = useProfile();
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
      style={{ ...(size ? { width: size, height: size, lineHeight: size } : null) }}
      onError={() => actions.setAvatarError(store, { avatar })}
    />
  );
}

export default function Profile(props: { profileId: string }) {
  return (
    <Profile.Provider profileId={props.profileId}>
      <div className={styles.root}>
        <Profile.Avatar />
        <Profile.Name />
      </div>
    </Profile.Provider>
  );
}

Profile.Provider = ProfileProvider;
Profile.Avatar = ProfileAvatar;
Profile.Name = ProfileName;
Profile.NumberedAvatarPlaceholder = ProfileNumberedAvatarPlaceholder;
