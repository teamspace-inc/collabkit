import GettingStarted from './GettingStarted.mdx';
import Security from './Security.mdx';
import Workspaces from './Workspaces.mdx';
import Notifications from './Notifications.mdx';
import SidebarComments from './components/SidebarComments.mdx';
import Provider from './components/Provider.mdx';
import CollabKitVueProvider from './vue/CollabKitVueProvider.mdx';
import CollabKitContextProvider from './vue/CollabKitContextProvider.mdx';
import VueCreateCollabKit from './vue/createCollabKit.mdx';
import Thread from './components/Thread.mdx';
import Commentable from './components/Commentable.mdx';
import Themes from './Themes.mdx';

import { RootDocNode } from './DocRoutes';
import UpsertUserDoc from './node/upsertUser.mdx';
import UpsertWorkspaceDoc from './node/upsertWorkspace.mdx';
import DeleteUserDoc from './node/deleteUser.mdx';
import AllComponents from './components/AllComponents.mdx';

export const DOCS: RootDocNode = {
  'Getting Started': { component: GettingStarted },
  Core: {
    title: 'Core',
    children: {
      CollabKitProvider: { component: Provider },
      Workspaces: { component: Workspaces },
      Security: { component: Security },
      Notifications: { component: Notifications },
      Themes: { component: Themes },
    },
  },
  Components: {
    title: 'Components',
    children: {
      Overview: { component: AllComponents },
      SidebarComments: { component: SidebarComments },
      Commentable: { component: Commentable },
    },
  },
  Other: {
    title: 'Other',
    children: {
      Thread: { component: Thread },
    },
  },
  Node: {
    title: 'Node',
    children: {
      deleteUser: { component: DeleteUserDoc },
      upsertUser: { component: UpsertUserDoc },
      upsertWorkspace: { component: UpsertWorkspaceDoc },
    },
  },
  Vue: {
    title: 'Vue',
    children: {
      CollabKitVueProvider: { component: CollabKitVueProvider },
      CollabKitContextProvider: { component: CollabKitContextProvider },
      createCollabKit: { component: VueCreateCollabKit },
    },
  },
};
