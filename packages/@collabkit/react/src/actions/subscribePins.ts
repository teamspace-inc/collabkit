import { DataSnapshot, onChildAdded, onChildChanged, ref } from 'firebase/database';
import { actions, getConfig } from '.';
import { DB, Pin, Store } from '../constants';

export async function subscribePins(store: Store) {
  console.log('subscribePins');
  const { appId, workspaceId } = getConfig(store);
  const onError = (e: Error) => {
    console.error({ e });
  };

  const onChange = (child: DataSnapshot) => {
    console.log('onPin');
    const pin = child.val() as Pin;
    const pinId = child.key;
    if (pinId) {
      store.workspaces[workspaceId].pins[pinId] = pin;
      switch (pin.state) {
        case 'resolved':
        case 'deleted':
        case 'pending':
          // don't need to worry about this
          // will not be subscribed on the next refresh
          break;
        case 'open':
          actions.subscribeThread(store, { workspaceId, threadId: pinId });
          break;
      }
    }
  };

  const pinsRef = ref(DB, `/pins/${appId}/${workspaceId}`);

  store.subs[`${pinsRef.toString()}#added`] = onChildAdded(pinsRef, onChange, onError);
  store.subs[`${pinsRef.toString()}#changed`] = onChildChanged(pinsRef, onChange, onError);
}
