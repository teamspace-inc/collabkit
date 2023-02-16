import { useSnapshot } from 'valtio';
import { Demo } from './Demo';
import { SignIn } from './SignIn';
import { store } from './store';

export default function App() {
  const { token } = useSnapshot(store);
  return token ? <Demo /> : <SignIn />;
}
