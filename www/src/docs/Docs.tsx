import React, { createContext } from 'react';
import { IntroductionDoc } from './IntroductionDoc';
import { PatternsDoc } from './PatternsDoc';
import { DetailViewsDoc } from './patterns/DetailViewsDoc';
import { ListViewsDoc } from './patterns/ListViewsDoc';
import { TableViewsDoc } from './patterns/TableViewsDoc';
import { GettingStartedDoc } from './GettingStartedDoc';
import { ConceptsDoc } from './ConceptsDoc';
import { ComponentsDoc } from './ComponentsDoc';
// import { AvatarDoc } from './components/AvatarDoc';
// import { FacepileDoc } from './components/FacepileDoc';
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
import { Route, Switch } from 'wouter';
import { CodeEditor } from './CodeEditor';
import { Doc } from './Doc';
import { PopoverThreadDemo } from './components/PopoverThreadDemo';

export function getDocHref(path: string[], key: string) {
  return `/docs/${path.concat([key]).join('/').replace(' ', '').toLowerCase()}`;
}

const DOCS: RootDocNode = {
  Introduction: { component: IntroductionDoc },
  'Getting Started': { component: GettingStartedDoc },
  Patterns: {
    component: PatternsDoc,
    children: {
      'Detail Views': { component: DetailViewsDoc },
      'List Views': { component: ListViewsDoc },
      'Table Views': { component: TableViewsDoc },
    },
  },
  Concepts: { component: ConceptsDoc },
  Components: {
    component: ComponentsDoc,
    children: {
      CollabKitProvider: { component: ProviderDoc },
      Thread: { component: ThreadDoc, demo: ThreadDemo },
      PopoverThread: { component: PopoverThreadDoc, demo: PopoverThreadDemo },
      Inbox: { component: InboxDoc },
      // Avatar: { component: AvatarDoc },
      // Facepile: { component: FacepileDoc },
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

function generateDocRoutes(docs: RootDocNode, path: string[] = []): React.ReactNode[] {
  const routes = [];
  for (const key in docs) {
    const { prev, next } = getRelatedNodes(DOCS, path.concat(key));

    if (has(docs, key)) {
      const value = docs[key];
      const pathString = getDocHref(path, key);
      routes.push(
        <Route key={pathString} path={pathString}>
          <Doc title={key} demo={value.demo?.({})} next={next} prev={prev}>
            {value.component({})}
          </Doc>
        </Route>
      );
      if (value.children) {
        routes.push(...generateDocRoutes(value.children, [key]));
      }
    }
  }
  return routes;
}

import { ThreadDemo } from './components/ThreadDemo';

const DocsProvider = createContext<RootDocNode | null>(null);

export function useDocs() {
  const docs = React.useContext(DocsProvider);
  if (docs === null) {
    throw new Error('useDocs must be used within a DocsProvider');
  }
  return { docs };
}

export type RootDocNode = {
  [key: string]: DocNode;
};

export type DocNode = {
  demo?: React.FunctionComponent;
  component: React.FunctionComponent;
  children?: RootDocNode;
};

type RelatedNodeReturnValue = {
  prev?: string[];
  next?: string[];
  node: DocNode;
};

function getRelatedNodes(
  root: RootDocNode,
  path: string[],
  prev: string[] | undefined = undefined,
  next: string[] | undefined = undefined,
  base: string[] | undefined = []
): RelatedNodeReturnValue {
  const key = path[0];
  const node = root[path[0]];
  const keys = Object.keys(root);
  const index = keys.indexOf(key);

  const prevKey = keys[index - 1];
  const nextKey = keys[index + 1];

  prev = prevKey ? base.concat(prevKey) : prev;
  next = nextKey ? base.concat(nextKey) : next;

  let value: RelatedNodeReturnValue;

  if (node?.children && node.children[path[1]]) {
    value = getRelatedNodes(node.children, path.slice(1), prev, next, [path[0]]);
  } else {
    value = {
      prev,
      next,
      node,
    };
  }

  return value;
}

export function Docs() {
  return (
    <DocsProvider.Provider value={DOCS}>
      <Switch>{generateDocRoutes(DOCS)}</Switch>
      <Route path="/codeEditor" component={CodeEditor} />
    </DocsProvider.Provider>
  );
}
