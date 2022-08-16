import { currentUserStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { Avatar } from './Avatar';

const StyledUser = styled('div', currentUserStyles.user);
const StyledUserName = styled('div', currentUserStyles.name);
const StyledUserEmail = styled('div', currentUserStyles.email);

export function CurrentUser() {
  const { store } = useApp();
  const { config, profiles } = useSnapshot(store);
  const userId = config.identify?.userId;
  if (!userId) {
    return <div>No Current User</div>;
  } else {
    const profile = profiles[userId];
    return profile ? (
      <StyledUser>
        <Avatar profile={profile} />
        <StyledUserName>{profile.name}</StyledUserName>
        <StyledUserEmail>{profile.email}</StyledUserEmail>
      </StyledUser>
    ) : (
      <div>No profile</div>
    );
  }
}
