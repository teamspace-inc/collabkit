import { Route } from 'wouter';
import { HomePage } from './pages/HomePage';
import { DocRoutes } from './docs/DocRoutes';
import { CollabKitProvider, Config, Workspace } from '@collabkit/react';
import { SetBreakpointContext } from './hooks/useWindowSize';
import { UIPage } from './pages/UIPage';
import { ThemeEditorPage } from './pages/ThemeEditorPage';
import { UnsubscribePage } from './pages/UnsubscribePage';
import { subHours } from 'date-fns/fp';
import { useSnapshot } from 'valtio';
import { store as wwwStore } from './home/Header';
import * as Theme from './styles/Theme.css';
import { nanoid } from 'nanoid';

const apiKey = import.meta.env.VITE_COLLABKIT_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_APP_ID;
const workspace = {
  id: nanoid(),
  name: 'Acme',
};
const userId = nanoid();

import { createDemoStore, mentionableUsers } from './home/demoStore';
import { CarouselPage } from './pages/CarouselPage';
import { useLayoutEffect } from 'react';
import { GetStartedPage } from './pages/GetStartedPage';

const defaultWorkspace: Partial<Workspace> = {
  inbox: {},
  timeline: {
    thread1: {
      event1: {
        id: 'event1',
        body: 'Orders are holding strong. Must be an ACV problem.',
        createdAt: subHours(1)(Date.now()),
        createdById: 'alicia',
        type: 'message',
      },
    },
    thread2: {
      event1: {
        id: 'event1',
        body: 'Revenue looks great here, any ideas on the downturn afterwards?',
        createdAt: subHours(3)(Date.now()),
        createdById: 'dom',
        type: 'message',
      },
      event2: {
        id: 'event2',
        body: 'I think it might have been a stock issue!',
        createdAt: subHours(2)(Date.now()),
        createdById: 'greta',
        type: 'message',
      },
    },
    thread3: {
      event1: {
        id: 'event1',
        body: 'Hey, [Dom](#@dom) have you looked at this order? I think the label is wrong.',
        createdAt: subHours(2)(Date.now()),
        createdById: 'alicia',
        type: 'message',
      },
      event2: {
        id: 'event2',
        body: 'I think you are right, I will look into it.',
        createdAt: subHours(1.4)(Date.now()),
        createdById: 'dom',
        type: 'message',
      },
      event3: {
        id: 'event3',
        body: "I found the problem! It's a typo in the label.",
        createdAt: subHours(0.2)(Date.now()),
        createdById: 'greta',
        type: 'message',
      },
    },
    thread4: {
      event1: {
        id: 'event1',
        body: `Is this the final cash balance? I think we need to add the cash from the Illinois bank account.`,
        createdAt: subHours(0.2)(Date.now()),
        createdById: 'alicia',
        type: 'message',
      },
      event2: {
        id: 'event2',
        body: `Yup that's included in the total.`,
        createdAt: subHours(0.1)(Date.now()),
        createdById: 'dom',
        type: 'message',
      },
    },
    thread5: {
      event1: {
        id: 'event1',
        body: `A healthy profit in Q1! How did we manage to get these numbers?`,
        createdAt: subHours(0.2)(Date.now()),
        createdById: 'alicia',
        type: 'message',
      },
      event2: {
        id: 'event2',
        body: `We changed distributors for some of our products [jameshanson](@jameshanson)`,
        createdAt: subHours(0.1)(Date.now()),
        createdById: 'julia',
        type: 'message',
      },
    },
    employee_8789935W: {
      event1: {
        id: 'event1',
        body: `Excellent performance this half - due for a promo?`,
        createdAt: subHours(0.2)(Date.now()),
        createdById: 'sara',
        type: 'message',
      },
    },
  },
  seen: {
    thread1: 'event2',
    thread2: 'event1',
    thread3: 'event3',
    thread4: 'event2',
    employee_2608510R: 'event1',
    // IdNMQ8uP07YfJtxyNqH28: '-N7ukV90v5j3inGLNQt3',
    // B0ENawPadDHvTyyILKWz2: '-N7ul9YUhGqMcZnBhpUh',
    // sxG87Sq0t3HHG0ghJMaXu: '-N84KobQKUnix1nNkMH-',
  },
};

for (const threadId in defaultWorkspace.timeline) {
  const timeline = defaultWorkspace.timeline[threadId];
  const eventIds = Object.keys(timeline);
  const lastEventId = eventIds[eventIds.length - 1];
  defaultWorkspace.inbox![threadId] = defaultWorkspace.timeline[threadId][lastEventId];
}

const config: Config = {
  apiKey: 'DUMMY_API_KEY_FOR_DEMO',
  appId: 'DUMMY_APP_ID_FOR_DEMO',
  workspace: { id: 'acme', name: 'ACME' },
  user: {
    id: 'anon',
    name: 'Jane Doe',
    email: 'anon@example.com',
  },
  mentionableUsers: mentionableUsers,
};

// const store = createDemoStore(config, defaultWorkspace);

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
    <CollabKitProvider
      apiKey={apiKey}
      appId={appId}
      workspace={workspace}
      user={{ id: userId, name: 'Anonymous' }}
      mentionableUsers={[]}
    >
      <SetBreakpointContext>
        <Route path="/ui" component={UIPage} />
        <Route path="/" component={HomePage} />
        <Route path="/getstarted" component={GetStartedPage} />
        {/* <Route path="/dashboard" component={DashboardPage} />
        <Route path="/signedin" component={DashboardPage} />
        <Route path="/signup" component={DashboardPage} /> */}
        <Route path="/theme-editor" component={ThemeEditorPage} />
        <Route path="/carousel" component={CarouselPage} />
        <Route path="/unsubscribe" component={UnsubscribePage} />
        <DocRoutes />
      </SetBreakpointContext>
    </CollabKitProvider>
  );
}
