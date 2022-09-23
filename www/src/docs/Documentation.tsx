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

export function getDocHref(path: string[], key: string) {
  return `/${path.concat([key]).join('/').replace(' ', '').toLowerCase()}`;
}

function generateDocRoutes(docs: DocNode, path: string[] = ['docs']): React.ReactNode[] {
  const routes = [];

  for (const key in docs) {
    if (has(docs, key)) {
      const value = docs[key];
      console.log({ key, value });
      const pathString = getDocHref(path, key);
      routes.push(
        <Route key={pathString} path={pathString}>
          {value.component}
        </Route>
      );
      if (value.children) {
        routes.push(...generateDocRoutes(value.children, path.concat([key])));
      }
    }
  }
  return routes;
}

const DocsProvider = createContext<DocNode | null>(null);

export function useDocs() {
  const docs = React.useContext(DocsProvider);
  if (docs === null) {
    throw new Error('useDocs must be used within a DocsProvider');
  }
  return { docs };
}

export type DocNode = {
  [key: string]: { component: React.FunctionComponent; children?: DocNode };
};

export function Documentation() {
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
        Thread: { component: ThreadDoc },
        PopoverThread: { component: PopoverThreadDoc },
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
      {generateDocRoutes(docs)}
      <Route path="/codeEditor" component={CodeEditor} />
    </DocsProvider.Provider>
  );
}
