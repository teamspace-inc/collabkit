import { actions } from './actions';
import { App } from './components/App';
import { Debug } from './components/Debug';
import { Thread } from './components/Thread';
import { Workspace } from './components/Workspace';

export const CollabKit = {
  App,
  Workspace,
  Thread,
  Debug,
  setup: actions.setup,
  identify: actions.identify,
};
