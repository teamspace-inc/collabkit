import { SetupProps, Store } from '../constants';
import { Events } from '../events';
import { monitorConnection } from './monitorConnection';

export function setup(store: Store, events: Events, props: SetupProps) {
  store.appState = 'config';
  store.config.setup = props;
  monitorConnection(store, events);
}
