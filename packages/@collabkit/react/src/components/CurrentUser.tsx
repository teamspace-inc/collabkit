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
    return (
      <StyledUser>
        <Avatar profile={profiles[userId]} />
        <StyledUserName>{profiles[userId].name}</StyledUserName>
        <StyledUserEmail>{profiles[userId].email}</StyledUserEmail>
      </StyledUser>
    );
  }
}
