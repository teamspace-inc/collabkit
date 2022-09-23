import React, { createContext } from 'react';
import { IntroductionDoc } from './IntroductionDoc';
import { PatternsDoc } from './PatternsDoc';
import { DetailViewsDoc } from './patterns/DetailViewsDoc';
import { ListViewsDoc } from './patterns/ListViewsDoc';
import { TableViewsDoc } from './patterns/TableViewsDoc';
import { GettingStartedDoc } from './GettingStartedDoc';
import { ConceptsDoc } from './ConceptsDoc';
import { ComponentsDoc } from './ComponentsDoc';
import { AvatarDoc } from './components/AvatarDoc';
import { FacepileDoc } from './components/FacepileDoc';
import { InboxDoc } from './components/InboxDoc';
import { PopoverThreadDoc } from './components/PopoverThreadDoc';
import { ProviderDoc } from './components/ProviderDoc';
import { ThreadDoc } from './components/ThreadDoc';
import { UseUnreadCommentsCountDoc } from './hooks/useUnreadCommentsCountDoc';
import { UseUnreadThreadsCountDoc } from './hooks/useUnreadThreadsCountDoc';
import { HooksDoc } from './HooksDoc';
import { CustomisationDoc } from './CustomisationDoc';
import { NotificationsDoc } from './NotificationsDoc';
import { AdvancedCustomisationDoc } from './AdvancedCustomisationDoc';
import has from 'has';
import { Route } from 'wouter';
import { CodeEditor } from './CodeEditor';
import { Doc } from './Doc';
import { Nav } from './Nav';
import { PopoverThreadDemo } from './components/PopoverThreadDemo';
import { CollabKitProvider } from '@collabkit/react';

export function getDocHref(path: string[], key: string) {
  return `/${path.concat([key]).join('/').replace(' ', '').toLowerCase()}`;
}

function generateDocRoutes(docs: DocNode, path: string[] = ['docs']): React.ReactNode[] {
  const routes = [];

  for (const key in docs) {
    if (has(docs, key)) {
      const value = docs[key];
      const pathString = getDocHref(path, key);
      routes.push(
        <Route key={pathString} path={pathString}>
          <Doc title={key} demo={value.demo?.({})}>
            {value.component({})}
          </Doc>
        </Route>
      );
      if (value.children) {
        routes.push(...generateDocRoutes(value.children, path.concat([key])));
      }
    }
  }
  return routes;
}

import { nanoid } from 'nanoid';
import { ThreadDemo } from './components/ThreadDemo';

const apiKey = import.meta.env.VITE_COLLABKIT_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_APP_ID;
const workspace = {
  id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
  name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
};

const DocsProvider = createContext<DocNode | null>(null);

export function useDocs() {
  const docs = React.useContext(DocsProvider);
  if (docs === null) {
    throw new Error('useDocs must be used within a DocsProvider');
  }
  return { docs };
}

export type DocNode = {
  [key: string]: {
    demo?: React.FunctionComponent;
    component: React.FunctionComponent;
    children?: DocNode;
  };
};

// function getRelatedNodes(outline: OutlineNode, path: string[] | readonly string[]) {
//   let node = outline;
//   let keys = Object.keys(node);
//   let next = null;
//   let prev = null;

//   for (const key of path) {
//     const index = keys.indexOf(key);
//     next = keys[index + 1] ?? next;
//     prev = keys[index - 1] ?? prev;
//     if (has(node, key)) {
//       if (typeof node[key] === 'function') {
//         // couldn't figure out cast here
//         let component = node[key];
//         return { next, prev, component };
//       }
//       node = node[key];
//       keys = Object.keys(node);
//     }
//   }

//   return { next, prev };
// }

// function Next() {
//   const { path } = useSnapshot(store);
//   const { next } = getRelatedNodes(getOutline(), path);
//   return <div>Next {next}</div>;
// }

// function Prev() {
//   const { path } = useSnapshot(store);
//   const { prev } = getRelatedNodes(getOutline(), path);
//   return <div>Previous {prev}</div>;
// }

export function Docs() {
  const docs = {
    Introduction: { component: IntroductionDoc },
    Patterns: {
      component: PatternsDoc,
      children: {
        'Detail Views': { component: DetailViewsDoc },
        'List Views': { component: ListViewsDoc },
        'Table Views': { component: TableViewsDoc },
      },
    },
    'Getting Started': { component: GettingStartedDoc },
    Concepts: { component: ConceptsDoc },
    Components: {
      component: ComponentsDoc,
      children: {
        Provider: { component: ProviderDoc },
        Thread: { component: ThreadDoc, demo: ThreadDemo },
        PopoverThread: { component: PopoverThreadDoc, demo: PopoverThreadDemo },
        Inbox: { component: InboxDoc },
        Avatar: { component: AvatarDoc },
        Facepile: { component: FacepileDoc },
      },
    },
    Hooks: {
      component: HooksDoc,
      children: {
        useUnreadCommentsCount: { component: UseUnreadCommentsCountDoc },
        useUnreadThreadsCount: { component: UseUnreadThreadsCountDoc },
      },
    },
    Customisation: { component: CustomisationDoc },
    Notifications: { component: NotificationsDoc },
    'Advanced Customisation': { component: AdvancedCustomisationDoc },
  };

  return (
    <DocsProvider.Provider value={docs}>
      <CollabKitProvider
        apiKey={apiKey}
        appId={appId}
        workspace={workspace}
        user={{ id: nanoid(), name: 'John Doe' }}
        mentionableUsers={[]}
      >
        <Route path="/docs">
          <Nav />
        </Route>
        <Route path="/docs/:name">
          <Nav />
        </Route>
        <Route path="/docs/:name/:sub">
          <Nav />
        </Route>
        {generateDocRoutes(docs)}
        <Route path="/codeEditor" component={CodeEditor} />
      </CollabKitProvider>
    </DocsProvider.Provider>
  );
}
