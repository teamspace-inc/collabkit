import { CollabKitProvider } from './components/Provider';
import { Debug } from './components/Debug';
import { Thread } from './components/Thread';
import { Button } from './components/Button';
import { withComments } from './components/withComments';
import { Inbox } from './components/Inbox';
import { CurrentUser } from './components/CurrentUser';
import { FloatingButton } from './components/FloatingButton';
import { Commentable } from './components/Commentable';
import { Pin, PurePin } from './components/Pin';
import { IdentifyProps, Mention } from './constants';
import { MentionProps } from './constants';
import { PopoverThread } from './components/PopoverThread';

export {
  CollabKitProvider as Provider,
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
  // pure components just render props passed
  PurePin as PurePin,
};
export type { IdentifyProps, MentionProps, Mention };
