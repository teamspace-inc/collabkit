import { actions } from '@collabkit/client';
import type { Profile as ProfileType } from '@collabkit/core';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';
import * as styles from '../theme/components/Profile.css';
import { vars } from '../theme/theme/index.css';
import { useProfileContext } from '../hooks/useProfile';
import { ProfileContext } from '../hooks/ProfileContext';
import { useCustomAvatar } from '../hooks/useRenderAvatarContext';

function ProfileProvider(props: { children: React.ReactNode; profileId: string }) {
  return (
    <ProfileContext.Provider value={props.profileId}>{props.children}</ProfileContext.Provider>
  );
}

function ProfileName(props: React.ComponentPropsWithoutRef<'span'>) {
  const store = useStore();
  const profileId = useProfileContext();
  const profiles = useSnapshot(store.profiles);
  const profile = profiles[profileId];
  return (
    <span className={styles.name} {...props}>
      {profile?.name ?? profile?.email ?? 'Anonymous'}
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
      {profile.name?.charAt(0) ?? profile.email?.charAt(0) ?? 'A'}
    </div>
  );
}

function ProfileNumberedAvatarPlaceholder({
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

function ProfileAvatar({
  size,
  ...props
}: { size?: string } & React.ComponentPropsWithoutRef<'div'>) {
  const store = useStore();
  const renderAvatar = useCustomAvatar();
  const { profiles, avatarErrors } = useSnapshot(store);
  const profileId = useProfileContext();
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
      className={styles.avatar}
      {...props}
      style={{ ...(size ? { width: size, height: size, lineHeight: size } : null) }}
      onError={() => actions.setAvatarError(store, { avatar })}
    />
  );
}

function Profile(props: React.ComponentPropsWithoutRef<'div'> & { profileId: string }) {
  return (
    <ProfileProvider profileId={props.profileId}>
      <div className={styles.root} {...props}>
        <ProfileAvatar />
        <ProfileName />
      </div>
    </ProfileProvider>
  );
}

export { Profile, ProfileProvider, ProfileAvatar, ProfileName, ProfileNumberedAvatarPlaceholder };
