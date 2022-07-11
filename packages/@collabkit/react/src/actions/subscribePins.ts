import { DataSnapshot, onChildAdded, onChildChanged, ref } from 'firebase/database';
import { getConfig } from '.';
import { DB, Store } from '../constants';

export async function subscribePins(store: Store, props: { workspaceId: string }) {
  const { appId } = getConfig(store);
  const onError = (e: Error) => {
    console.error({ e });
  };
  const onChange = (child: DataSnapshot) => {
    const pin = child.val();
    console.log('got', pin);
    store.workspaces[props.workspaceId].pins[pin.id] = pin;
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
