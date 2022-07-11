import { DataSnapshot, onChildAdded, onChildChanged, ref } from 'firebase/database';
import { actions, getConfig } from '.';
import { DB, Pin, Store } from '../constants';

export async function subscribePins(store: Store, props: { workspaceId: string }) {
  const { appId } = getConfig(store);
  const onError = (e: Error) => {
    console.error({ e });
  };

  const onChange = (child: DataSnapshot) => {
    const pin = child.val() as Pin;
    const pinId = child.key;
    if (pinId) {
      store.workspaces[props.workspaceId].pins[pinId] = pin;
      switch (pin.state) {
        case 'resolved':
        case 'deleted':
        case 'resolved':
          // don't need to worry about this
          // will not be subscribed on the next refresh
          break;
        case 'open':
          actions.subscribeThread(store, { workspaceId: props.workspaceId, threadId: pinId });
          break;
      }
    }
  };

  store.subs[`pin#added`] = onChildAdded(
    ref(DB, `/pins/${appId}/${props.workspaceId}`),
    onChange,
    onError
  );

  store.subs[`pin#changed`] = onChildChanged(
    ref(DB, `/pins/${appId}/${props.workspaceId}`),
    onChange,
    onError
  );
}
