import React from 'react';
import { IntroductionDoc } from './IntroductionDoc';
import { DetailViewsDoc } from './patterns/DetailViewsDoc';
import { ListViewsDoc } from './patterns/ListViewsDoc';
import { TableViewsDoc } from './patterns/TableViewsDoc';
import { GettingStartedDoc } from './GettingStartedDoc';
// import { AvatarDoc } from './components/AvatarDoc';
// import { FacepileDoc } from './components/FacepileDoc';
import { InboxDoc } from './components/InboxDoc';
import { PopoverThreadDoc } from './components/PopoverThreadDoc';
import { ProviderDoc } from './components/ProviderDoc';
import { ThreadDoc } from './components/ThreadDoc';
import { UseUnreadCommentsCountDoc } from './hooks/useUnreadCommentsCountDoc';
import { UseUnreadThreadsCountDoc } from './hooks/useUnreadThreadsCountDoc';
import { CustomisationDoc } from './CustomisationDoc';
import { NotificationsDoc } from './NotificationsDoc';
import { AdvancedCustomisationDoc } from './AdvancedCustomisationDoc';
import has from 'has';
import { Route, Switch } from 'wouter';
import { CodeEditor } from './CodeEditor';
import { Doc } from './Doc';

export function getDocHref(path: string[], key: string) {
  return `/docs/${path.concat([key]).join('/').replace(' ', '').toLowerCase()}`;
}

export const DOCS: RootDocNode = {
  Introduction: { component: IntroductionDoc },
  'Getting Started': { component: GettingStartedDoc },
  Patterns: {
    title: 'Patterns',
    children: {
      'Detail Views': { component: DetailViewsDoc },
      'List Views': { component: ListViewsDoc },
      'Table Views': { component: TableViewsDoc },
    },
  },
  Components: {
    title: 'Components',
    children: {
      CollabKitProvider: { component: ProviderDoc },
      Thread: { component: ThreadDoc },
      PopoverThread: { component: PopoverThreadDoc },
      Inbox: { component: InboxDoc },
      // Avatar: { component: AvatarDoc },
      // Facepile: { component: FacepileDoc },
    },
  },
  Hooks: {
    title: 'Hooks',
    children: {
      useUnreadCommentsCount: { component: UseUnreadCommentsCountDoc },
      useUnreadThreadsCount: { component: UseUnreadThreadsCountDoc },
    },
  },
  Workspaces: { component: CustomisationDoc },
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
          {'component' in value ? (
            <Doc title={key} next={next} prev={prev}>
              {value.component?.({})}
            </Doc>
          ) : null}
        </Route>
      );
      if ('children' in value) {
        routes.push(...generateDocRoutes(value.children, [key]));
      }
    }
  }
  return routes;
}

export type RootDocNode = {
  [key: string]: DocNode;
};

export type DocNode =
  | {
      component: React.FunctionComponent;
    }
  | {
      title: string;
      children: RootDocNode;
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

  if ('children' in node && node.children[path[1]]) {
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
    <>
      <Switch>{generateDocRoutes(DOCS)}</Switch>
      <Route path="/codeEditor" component={CodeEditor} />
    </>
  );
}