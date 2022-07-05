import { useSnapshot } from 'valtio';
import { useApp } from './App';
import { Avatar } from './Avatar';
import { styled } from './UIKit';

const StyledUser = styled('div', {
  display: 'flex',
  gap: '10px',
});
const StyledUserName = styled('div', {
  fontWeight: 500,
});

const StyledUserEmail = styled('div', {
  color: '$neutral11',
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
        <Avatar profile={profile} />
        <StyledUserName>{profile.name}</StyledUserName>
        <StyledUserEmail>{profile.email}</StyledUserEmail>
      </StyledUser>
    ) : (
      <div>No profile</div>
    );
  }
}
