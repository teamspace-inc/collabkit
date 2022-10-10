import { styled } from '@stitches/react';
import { Route } from 'wouter';
import { Devs } from './devs/Devs';
import { useEffect } from 'react';

import { DataGridPage } from './pages/DataGridPage';
import { HomePage } from './pages/HomePage';
import { Docs } from './docs/Docs';
import { CollabKitProvider, Config, Workspace } from '@collabkit/react';
import { SetBreakpointContext } from './hooks/useWindowSize';
import { UIPage } from './pages/UIPage';
import { ThemeEditorPage } from './pages/ThemeEditorPage';

const Page = styled('div', {});

// todo generate a new workspace
// for each docs user
const apiKey = import.meta.env.VITE_COLLABKIT_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_APP_ID;
const workspace = {
  id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
  name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
};

import { createDemoStore, mentionableUsers } from './home/demoStore';

const defaultWorkspace: Partial<Workspace> = {
  // pins: {
  //   B0ENawPadDHvTyyILKWz2: {
  //     createdAt: 1658843343088,
  //     createdById: 'alicia-1',
  //     offset: { x: 0.5791564580251479, y: 0.7686934621710526 },
  //     selector: '#demo-0-ui',
  //     state: 'open',
  //     url: '/',
  //   },
  //   IdNMQ8uP07YfJtxyNqH28: {
  //     createdAt: 1658843169471,
  //     createdById: 'dom-1',
  //     offset: { x: 0.5128657775517751, y: 0.29183799342105265 },
  //     selector: '#demo-0-ui',
  //     state: 'open',
  //     url: '/',
  //   },
  //   thread3: {
  //     createdAt: 1658842883088,
  //     createdById: 'ville-1',
  //     offset: { x: 0.2997497919748521, y: 0.5798673930921052 },
  //     selector: '#demo-0-ui',
  //     state: 'open',
  //     url: '/',
  //   },
  // },
  openThreads: {
    thread1: {
      meta: {
        cellId: 'thread1',
        viewId: 'demo',
      },
    },
    thread2: {
      meta: {
        cellId: 'thread2',
        viewId: 'demo',
      },
    },
    thread3: {
      meta: {
        cellId: 'thread3',
        viewId: 'demo',
      },
    },
    thread4: {
      meta: {
        cellId: 'thread4',
        viewId: 'demo',
      },
    },
  },
  timeline: {
    thread1: {
      event1: {
        id: 'event1',
        body: 'Orders are holding strong. Must be an ACV problem.',
        createdAt: 1658843343088,
        createdById: 'alicia',
        type: 'message',
        hasProfile: true,
      },
    },
    thread2: {
      event1: {
        id: 'event1',
        body: 'Revenue looks great here, any ideas on the downturn afterwards?',
        createdAt: 1658843169471,
        createdById: 'dom',
        type: 'message',
        hasProfile: true,
      },
      event2: {
        id: 'event2',
        body: 'I think it might have been a stock issue!',
        createdAt: 1658843196463,
        createdById: 'greta',
        type: 'message',
        hasProfile: true,
      },
    },
    thread3: {
      event1: {
        id: 'event1',
        body: 'Hey, [Dom](#@dom) have you looked at this order? I think the label is wrong.',
        createdAt: 1658842883088,
        createdById: 'alicia',
        type: 'message',
        hasProfile: true,
      },
      event2: {
        id: 'event2',
        body: 'I think you are right, I will look into it.',
        createdAt: 1658842883088,
        createdById: 'dom',
        type: 'message',
        hasProfile: true,
      },
      event3: {
        id: 'event3',
        body: "I found the problem! It's a typo in the label.",
        createdAt: 1658842883088,
        createdById: 'greta',
        type: 'message',
        hasProfile: true,
      },
    },
    thread4: {
      event1: {
        id: 'event1',
        body: `Is this the final cash balance? I think we need to add the cash from the Illinois bank account.`,
        createdAt: 1658842883088,
        createdById: 'alicia',
        type: 'message',
        hasProfile: true,
      },
      event2: {
        id: 'event2',
        body: `Yup that's included in the total.`,
        createdAt: 1658842883088,
        createdById: 'dom',
        type: 'message',
        hasProfile: true,
      },
    },
  },
  seen: {
    thread1: 'event2',
    thread2: 'event1',
    thread3: 'event3',
    thread4: 'event2',
    // IdNMQ8uP07YfJtxyNqH28: '-N7ukV90v5j3inGLNQt3',
    // B0ENawPadDHvTyyILKWz2: '-N7ul9YUhGqMcZnBhpUh',
    // sxG87Sq0t3HHG0ghJMaXu: '-N84KobQKUnix1nNkMH-',
  },
};

const config: Config = {
  _isDemo: true,
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

const store = createDemoStore(config, defaultWorkspace);

export default function App() {
  useEffect(() => {
    // @ts-expect-error
    window.Intercom('boot', {
      api_base: 'https://api-iam.intercom.io',
      app_id: 'cwr7lgni',
    });

    // @ts-expect-error
    window.Intercom('update');
  }, []);

  return (
    <CollabKitProvider
      apiKey={apiKey}
      appId={appId}
      _demoStore={store}
      workspace={workspace}
      user={{ id: 'anon', name: 'Anonymous' }}
      mentionableUsers={[]}
    >
      <SetBreakpointContext>
        <Page>
          <Route path="/ui" component={UIPage} />
          <Route path="/" component={HomePage} />
          <Route path="/devs" component={Devs} />
          <Route path="/signedIn" component={Devs} />
          <Route path="/datagrid" component={DataGridPage} />
          <Route path="/themeEditor" component={ThemeEditorPage} />
          <Docs />
        </Page>
      </SetBreakpointContext>
    </CollabKitProvider>
  );
}
