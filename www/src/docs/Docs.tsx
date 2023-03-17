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
import usePinCommentButton from './components/usePinCommentButton.mdx';
import Themes from './Themes.mdx';

import { RootDocNode } from './DocRoutes';
import UpsertUserDoc from './node/upsertUser.mdx';
import UpsertWorkspaceDoc from './node/upsertWorkspace.mdx';
import DeleteUserDoc from './node/deleteUser.mdx';
import AllComponents from './components/AllComponents.mdx';
import Navigation from './Navigation.mdx';
import Composability from './Composability.mdx';
import Objects from './Objects.mdx';
import CommentDoc from './restAPI/comment.mdx';

export const DOCS: RootDocNode = {
  'Getting Started': { component: GettingStarted },

  Workspaces: { component: Workspaces },
  Navigation: { component: Navigation },
  Objects: { component: Objects },
  Composability: { component: Composability },
  Security: { component: Security },
  Notifications: { component: Notifications },
  Themes: { component: Themes },

  React: {
    title: 'React',
    children: {
      Overview: { component: AllComponents },
      CollabKitProvider: { title: '<CollabKitProvider/>', component: Provider },
      SidebarComments: { title: '<SidebarComments/>', component: SidebarComments },
      Commentable: { title: '<Commentable/>', component: Commentable },
      Thread: { title: '<Thread/>', component: Thread },
      usePinCommentButton: { title: 'usePinCommentButton()', component: usePinCommentButton },
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
  RestAPI: {
    title: 'Rest API',
    children: {
      comment: { component: CommentDoc },
    },
  },
};
