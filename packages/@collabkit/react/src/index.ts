import { setup } from './actions/setup';
import { identify } from './actions/identify';
import { mentions } from './actions/mentions';
import { App } from './components/App';
import { Debug } from './components/Debug';
import { Thread } from './components/Thread';
import { Workspace } from './components/Workspace';
import { Button } from './components/Button';
import { withComments } from './components/withComments';
import { Inbox } from './components/Inbox';
import { CurrentUser } from './components/CurrentUser';
import { FloatingButton } from './components/FloatingButton';
import { Commentable } from './components/Commentable';
import { Pin } from './components/Pin';
import { IdentifyProps, Mention } from './constants';
import { MentionProps } from './constants';
import { PopoverThread } from './components/PopoverThread';

export {
  App as CollabKitProvider,
  Workspace,
  Commentable,
  CurrentUser,
  Thread,
  Button,
  FloatingButton,
  PopoverThread,
  Pin,
  Inbox,
  Debug,
  withComments,
  setup,
  identify,
  mentions,
};
export type { IdentifyProps, MentionProps, Mention };
