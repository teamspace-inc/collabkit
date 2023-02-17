import { useSnapshot } from 'valtio';
import { Demo } from './Demo';
import { useAppParams } from './hooks/useAppParams';
import { SignIn } from './SignIn';
import { store } from './store';

export default function App() {
  const snapshot = useSnapshot(store);
  const params = useAppParams();
  const token = params.token ?? snapshot.token;
  if (token) {
    return <Demo appId={params.appId} token={token} />;
  } else {
    return <SignIn />;
  }
}
