import { actions } from './actions';
import { App } from './components/App';
import { Debug } from './components/Debug';
import { Thread } from './components/Thread';
import { Workspace } from './components/Workspace';
import { Button } from './components/Button';
import { withComments } from './components/withComments';
import { Inbox } from './components/Inbox';
import { CurrentUser } from './components/CurrentUser';
import { FloatingButton } from './components/FloatingButton';

export const CollabKit = {
  App,
  Workspace,
  CurrentUser,
  Thread,
  Button,
  FloatingButton,
  Inbox,
  Debug,
  withComments,
  setup: actions.setup,
  identify: actions.identify,
  mentions: actions.mentions,
};
