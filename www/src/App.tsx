import { Route, Switch } from 'wouter';
import { HomePage } from './pages/HomePage';
import { DocRoutes } from './docs/DocRoutes';
import { CollabKitProvider } from '@collabkit/react';
import { SetBreakpointContext } from './hooks/useWindowSize';
import { UnsubscribePage } from './pages/UnsubscribePage';
import { useSnapshot } from 'valtio';
import { store as wwwStore } from './home/Header';
import * as Theme from './styles/Theme.css';
import { nanoid } from 'nanoid';
import { useLayoutEffect } from './hooks/useLayoutEffect';
import { PinLayer } from '../../packages/@collabkit/react/src/components/PinLayer';

const apiKey = import.meta.env.VITE_COLLABKIT_UNSECURE_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_UNSECURE_APP_ID;
const workspace = {
  id: nanoid(),
  name: 'Acme',
};
const userId = nanoid();

const config = {
  apiKey,
  appId,
  workspace,
  user: { id: userId, name: 'Anonymous' },
  mentionableUsers: [],
};

export default function App() {
  useLayoutEffect(() => {
    // if a user resizes the window to small
    // and then opens the burger menu
    // and resizes the window to be larger
    // we need to remove the noscroll class
    // added by the small screen burger menu
    document.body.classList.remove('noscroll');
  }, []);

  const { backgroundColor, theme } = useSnapshot(wwwStore);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    document.body.className = Theme[theme];
  }, [backgroundColor, theme]);

  return (
    <CollabKitProvider {...config}>
      <SetBreakpointContext>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/unsubscribe" component={UnsubscribePage} />
          <DocRoutes />
          <Route>404, page not found</Route>
        </Switch>
      </SetBreakpointContext>
      <PinLayer />
    </CollabKitProvider>
  );
}
