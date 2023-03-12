import GettingStarted from './GettingStarted.mdx';
import Security from './Security.mdx';
import Workspaces from './Workspaces.mdx';
import Notifications from './Notifications.mdx';
import SidebarComments from './components/SidebarComments.mdx';
import Provider from './components/Provider.mdx';
import CollabKitVueProvider from './components/vue/CollabKitVueProvider.mdx';
import CollabKitContextProvider from './components/vue/CollabKitContextProvider.mdx';
import VueCreateCollabKit from './components/vue/createCollabKit.mdx';
import Thread from './components/Thread.mdx';
import Commentable from './components/Commentable.mdx';
import Themes from './Themes.mdx';

import { RootDocNode } from './DocRoutes';
import { UpsertUserDoc } from './components/nodeClient/upsertUserDoc';
import { UpsertWorkspaceDoc } from './components/nodeClient/upsertWorkspaceDoc';

export const DOCS: RootDocNode = {
  // Dashboard: { component: DashboardPage },
  // Empty: { isEmpty: true },
  'Getting Started': { component: GettingStarted },
  // 'Design Patterns': { component: DesignPatterns },
  // Patterns: {
  //   title: 'Patterns',
  //   children: {
  //     'Detail Views': { component: DetailViewsDoc },
  //     'List Views': { component: ListViewsDoc },
  //     'Table Views': { component: TableViewsDoc },
  //   },
  // },
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
      SidebarComments: { component: SidebarComments },
      Commentable: { component: Commentable },
      // Inbox: { component: InboxDoc },
      // InboxButton: { component: InboxButtonDoc },
      // SidebarInbox: { component: SidebarInboxDoc },
      // SidebarInboxButton: { component: SidebarInboxButtonDoc },
      // Avatar: { component: AvatarDoc },
      // Facepile: { component: FacepileDoc },
    },
  },
  // Hooks: {
  //   title: 'Hooks',
  //   children: {
  //     // useUnreadCommentsCount: { component: UseUnreadCommentsCountDoc },
  //     // useUnreadThreadsCount: { component: UseUnreadThreadsCountDoc },
  //   },
  // },
  // 'Api Reference': {
  //   title: 'HTTP API',
  //   children: {
  //     CreateComment: { component: CommentAPI },
  //   },
  // },
  Other: {
    title: 'Other',
    children: {
      Thread: { component: Thread },
      // Inbox: { component: InboxDoc },
      // InboxButton: { component: InboxButtonDoc },
      // SidebarInbox: { component: SidebarInboxDoc },
      // SidebarInboxButton: { component: SidebarInboxButtonDoc },
      // Avatar: { component: AvatarDoc },
      // Facepile: { component: FacepileDoc },
    },
  },
  // 'Api Reference': {
  //   title: 'HTTP API',
  //   children: {
  //     CreateComment: { component: CommentAPI },
  //   },
  // },
  'Node client': {
    title: 'Node',
    children: {
      upsertUser: { component: UpsertUserDoc },
      upsertWorkspace: { component: UpsertWorkspaceDoc },
      // createUserToken: {component: createUserToken}
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
