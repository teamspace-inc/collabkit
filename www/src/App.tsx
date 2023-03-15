import { Route, Switch } from 'wouter';
import { HomePage } from './pages/HomePage';
import { DocRoutes } from './docs/DocRoutes';
import { CollabKitContextProvider, createCollabKitStore } from '@collabkit/react';
import { SetBreakpointContext } from './hooks/useWindowSize';
import { UIPage } from './pages/UIPage';
import { ThemeEditorPage } from './pages/ThemeEditorPage';
import { UnsubscribePage } from './pages/UnsubscribePage';
import { useSnapshot } from 'valtio';
import { store as wwwStore } from './home/Header';
import * as Theme from './styles/Theme.css';
import { nanoid } from 'nanoid';
import { CarouselPage } from './pages/CarouselPage';
import { useLayoutEffect } from './hooks/useLayoutEffect';
import { GetStartedPage } from './pages/GetStartedPage';
import { PinLayer } from '../../packages/@collabkit/react/src/components/PinLayer';

const apiKey = import.meta.env.VITE_COLLABKIT_UNSECURE_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_UNSECURE_APP_ID;
const workspace = {
  id: nanoid(),
  name: 'Acme',
};
const userId = nanoid();

const store = createCollabKitStore({
  apiKey,
  appId,
  workspace,
  user: { id: userId, name: 'Anonymous' },
  mentionableUsers: [],
});

export default function App() {
  // useEffect(() => {
  //   // @ts-expect-error
  //   window.Intercom('boot', {
  //     api_base: 'https://api-iam.intercom.io',
  //     app_id: 'cwr7lgni',
  //   });

  //   // @ts-expect-error
  //   window.Intercom('update');
  // }, []);

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
    <CollabKitContextProvider store={store}>
      <SetBreakpointContext>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/getstarted" component={GetStartedPage} />
          <Route path="/unsubscribe" component={UnsubscribePage} />
          <DocRoutes />
          <Route>404, page not found</Route>
        </Switch>
      </SetBreakpointContext>
      <PinLayer />
    </CollabKitContextProvider>
  );
}
