import { actions } from './actions';
import { App } from './components/App';
import { Debug } from './components/Debug';
import { Thread } from './components/Thread';
import { Workspace } from './components/Workspace';
import { Button } from './components/Button';
import { withComments } from './components/withComments';
// import { Inbox } from './components/Inbox';

export const CollabKit = {
  App,
  Workspace,
  Thread,
  Button,
  Debug,
  withComments,
  setup: actions.setup,
  identify: actions.identify,
  mentions: actions.mentions,
};
