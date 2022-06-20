import { signOut } from 'firebase/auth';
import { useSnapshot } from 'valtio';
import { store, auth } from './App';
import { Button, HStack } from './Dashboard';

export function CurrentUser() {
  const { user } = useSnapshot(store);

  return (
    <HStack style={{ gap: '1rem', alignItems: 'center' }}>
      <img src={user?.photoURL || ''} /> {user?.displayName} {user?.email ?? 'Anonymous'}
      <Button type="secondary" onClick={() => signOut(auth)}>
        Sign Out
      </Button>
    </HStack>
  );
}
