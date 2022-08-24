import { subscribeThread } from './subscribeThread';
import type { Store } from '@collabkit/core';
import { getConfig } from './index';
import type { Sync } from '@collabkit/core';

export async function subscribePins(store: Store) {
  const { appId, workspaceId } = getConfig(store);
  const onPinChange: Sync.PinEventHandler = ({ pinId, pin }) => {
    store.workspaces[workspaceId].pins[pinId] = pin;
    switch (pin.state) {
      case 'resolved':
      case 'deleted':
      case 'pending':
        // don't need to worry about this
        // will not be subscribed on the next refresh
        break;
      case 'open':
        subscribeThread(store, { workspaceId, threadId: pinId });
        break;
    }
  };
  store.sync.subscribePins(
    {
      appId,
      workspaceId,
      subs: store.subs,
    },
    onPinChange
  );
}
