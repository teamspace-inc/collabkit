import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from './App';
import { Avatar } from './Avatar';
import { styled } from './UIKit';

const StyledUser = styled('div', {
  display: 'flex',
  gap: '$space$2',
});
const StyledUserName = styled('div', {
  fontWeight: '$fontWeights$1',
});

const StyledUserEmail = styled('div', {
  color: '$colors$secondaryText',
});

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
        <Avatar style={{ width: 24, height: 24 }} profile={profile} />
        <StyledUserName>{profile.name}</StyledUserName>
        <StyledUserEmail>{profile.email}</StyledUserEmail>
      </StyledUser>
    ) : (
      <div>No profile</div>
    );
  }
}
