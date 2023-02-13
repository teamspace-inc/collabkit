import React from 'react';
import { useSnapshot } from 'valtio';
import has from 'has';
import { Redirect, Route, Switch } from 'wouter';

import { IntroductionDoc } from './IntroductionDoc';
// import { DetailViewsDoc } from './patterns/DetailViewsDoc';
// import { ListViewsDoc } from './patterns/ListViewsDoc';
// import { TableViewsDoc } from './patterns/TableViewsDoc';
import { GettingStartedDoc } from './GettingStartedDoc';
// import { AvatarDoc } from './components/AvatarDoc';
// import { FacepileDoc } from './components/FacepileDoc';
import { InboxDoc } from './components/inbox/InboxDoc';
import { InboxButtonDoc } from './components/InboxButtonDoc';
import { CollabKitProviderDoc } from './components/CollabKitProviderDoc';
import { ThreadDoc } from './components/ThreadDoc';
import { UseUnreadCommentsCountDoc } from './hooks/useUnreadCommentsCountDoc';
import { UseUnreadThreadsCountDoc } from './hooks/useUnreadThreadsCountDoc';
import { CustomisationDoc } from './CustomisationDoc';
import { Doc } from './Doc';
import { WorkspacesDoc } from './WorkspacesDoc';
import { SecureModeDoc } from './SecureModeDoc';
import { NotificationsDoc } from './NotificationsDoc';
import { SidebarInboxDoc } from './components/SidebarInboxDoc';
import { SidebarInboxButtonDoc } from './components/SidebarInboxButtonDoc';
import { DashboardPage } from '../pages/DashboardPage';
import { dashboardStore } from '../dashboard/dashboardStore';
import { ProfileDoc } from './advanced/profile/ProfileDoc';
import { AdvancedThreadProviderDoc } from './advanced/AdvancedThreadProviderDoc';
import { CommentDoc } from './advanced/comment/CommentDoc';
import { CommentAPI } from './hooks/commentAPI';

export function getDocHref(path: string[], key: string) {
  return getPathHref(path.concat([key]));
}

export function getPathHref(path: string[]) {
  return `/docs/${path.join('/').replace(' ', '').toLowerCase()}`;
}

export const DOCS: RootDocNode = {
  // Dashboard: { component: DashboardPage },
  // Empty: { isEmpty: true },

  Introduction: { component: IntroductionDoc },
  'Getting Started': { component: GettingStartedDoc },
  // Patterns: {
  //   title: 'Patterns',
  //   children: {
  //     'Detail Views': { component: DetailViewsDoc },
  //     'List Views': { component: ListViewsDoc },
  //     'Table Views': { component: TableViewsDoc },
  //   },
  // },
  Components: {
    title: 'Components',
    children: {
      CollabKitProvider: { component: CollabKitProviderDoc },
      Thread: { component: ThreadDoc },
      Inbox: { component: InboxDoc },
      InboxButton: { component: InboxButtonDoc },
      SidebarInbox: { component: SidebarInboxDoc },
      SidebarInboxButton: { component: SidebarInboxButtonDoc },
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
  'Secure Mode': { component: SecureModeDoc },
  Workspaces: { component: WorkspacesDoc },
  Notifications: { component: NotificationsDoc },
  Customisation: { component: CustomisationDoc },
  'Api Reference': {
    title: 'HTTP API',
    children: {
      CreateComment: { component: CommentAPI },
    },
  },
  'Advanced Customisation': {
    title: 'Advanced Customisation',
    children: {
      ['Thread.Provider']: { component: AdvancedThreadProviderDoc },
      Comment: { component: CommentDoc },
      Profile: { component: ProfileDoc },
    },
  },
};

function generateDocRoutes(docs: RootDocNode, path: string[] = []): JSX.Element[] {
  const routes = [
    <Route key="docs" path="/docs">
      <Redirect to="/docs/introduction" />
    </Route>,
  ];
  for (const key in docs) {
    const { prev, next } = getRelatedNodes(DOCS, path.concat(key));

    if (has(docs, key)) {
      const value = docs[key];
      const pathString = getDocHref(path, key);

      // if we are at /docs/patterns
      // redirect to: /docs/patterns/detailviews
      const childPath =
        'children' in value ? getDocHref(path.concat([key]), Object.keys(value.children)[0]) : null;

      routes.push(
        <Route key={pathString} path={pathString}>
          {'component' in value ? (
            <Doc title={key} next={next} prev={prev}>
              {value.component?.({})}
            </Doc>
          ) : null}
          {childPath ? <Redirect to={childPath} /> : null}
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
    }
  | { isEmpty: boolean };

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

  const prevKey = keys[index - 1] ?? keys[index - 2];
  const nextKey = keys[index + 1] ?? keys[index + 2];

  prev = prevKey ? base.concat(prevKey) : prev;
  next = nextKey ? base.concat(nextKey) : next;

  let value: RelatedNodeReturnValue;

  if (node && 'children' in node && node.children[path[1]]) {
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

// if logged in adds a dashboard route
export function useDocs() {
  const docs = DOCS;
  const { user, org } = useSnapshot(dashboardStore);
  const orgName = org?.name;
  const dashboardPlusDocs =
    user && orgName
      ? { [orgName]: { component: DashboardPage }, '': { isEmpty: true }, ...docs }
      : docs;
  return dashboardPlusDocs;
}

export function Docs() {
  const docs = useDocs();

  return (
    <>
      <Switch>{generateDocRoutes(docs)}</Switch>
    </>
  );
}
