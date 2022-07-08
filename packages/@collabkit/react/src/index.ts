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
import { Indicator } from './components/Indicator';
import { IdentifyProps, Mention } from './constants';
import { MentionProps } from './constants';

export {
  App as CollabKitProvider,
  Workspace,
  Commentable,
  CurrentUser,
  Thread,
  Button,
  FloatingButton,
  Indicator,
  Inbox,
  Debug,
  withComments,
  setup,
  identify,
  mentions,
};
export type { IdentifyProps, MentionProps, Mention };

/** @depracated use the named exports */
export const CollabKit = {
  App,
  Workspace,
  Commentable,
  CurrentUser,
  Thread,
  Button,
  FloatingButton,
  Indicator,
  Inbox,
  Debug,
  withComments,
  setup,
  identify,
  mentions,
};
