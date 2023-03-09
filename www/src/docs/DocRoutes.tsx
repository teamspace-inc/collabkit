import React from 'react';
import { useSnapshot } from 'valtio';
import has from 'has';
import { Redirect, Route, Switch } from 'wouter';
import '@code-hike/mdx/dist/index.css';

// import { DetailViewsDoc } from './patterns/DetailViewsDoc';
// import { ListViewsDoc } from './patterns/ListViewsDoc';
// import { TableViewsDoc } from './patterns/TableViewsDoc';
// import DesignPatterns from './DesignPatterns.mdx';
// import { AvatarDoc } from './components/AvatarDoc';
// import { FacepileDoc } from './components/FacepileDoc';
// import { InboxDoc } from './components/inbox/InboxDoc';
// import { InboxButtonDoc } from './components/InboxButtonDoc';
// import { CollabKitProviderDoc } from './components/CollabKitProviderDoc';
// import { ThreadDoc } from './components/ThreadDoc';
// import { UseUnreadCommentsCountDoc } from './hooks/useUnreadCommentsCountDoc';
// import { UseUnreadThreadsCountDoc } from './hooks/useUnreadThreadsCountDoc';
// import { CustomisationDoc } from './CustomisationDoc';
// import { WorkspacesDoc } from './WorkspacesDoc';
// import { NotificationsDoc } from './NotificationsDoc';

import { DashboardPage } from '../pages/DashboardPage';
// import { ProfileDoc } from './advanced/profile/ProfileDoc';
// import { AdvancedThreadProviderDoc } from './advanced/AdvancedThreadProviderDoc';
// import { CommentDoc } from './advanced/comment/CommentDoc';
// import { CommentAPI } from './hooks/commentAPI';
import { dashboardStore } from '../dashboard/dashboardActions';
import { DOCS } from './Docs';
import { DocWithAnchorList } from './Doc';
import { ThemeContextValue, Themes } from '@collabkit/react';

export function getDocHref(path: string[], key: string) {
  return getPathHref(path.concat([key]));
}

export function getPathHref(path: string[]) {
  return `/docs/${path.join('/').replace(' ', '').toLowerCase()}`;
}

function generateDocRoutes(docs: RootDocNode, path: string[] = []): JSX.Element[] {
  const routes = [
    <Route key="docs" path="/docs">
      <Redirect to="/docs/gettingstarted" />
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
            <DocWithAnchorList key={key} next={next} prev={prev} component={value.component} />
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
      component: React.FunctionComponent<any>;
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
export function useDocRoutes() {
  const docs = DOCS;
  const { user, org } = useSnapshot(dashboardStore);
  const orgName = org?.name;
  const dashboardPlusDocs =
    user && orgName
      ? { [orgName]: { component: DashboardPage }, '': { isEmpty: true }, ...docs }
      : docs;
  return dashboardPlusDocs;
}

const ThemeContext = React.createContext<ThemeContextValue>(Themes.DarkTheme);

export function DocRoutes() {
  const docs = useDocRoutes();

  return (
    <ThemeContext.Provider value={Themes.DarkTheme}>
      <Switch>{generateDocRoutes(docs)}</Switch>
    </ThemeContext.Provider>
  );
}
