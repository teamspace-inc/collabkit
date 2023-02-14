import { useSnapshot } from 'valtio';

import { useUserParams } from './hooks/useUserParams';
import { Demo } from './Demo';
import { SignIn } from './SignIn';
import { store } from './store';

export default function App() {
  useUserParams();
  const { user } = useSnapshot(store);
  return <div>{!user ? <SignIn /> : <Demo />}</div>;
}
