import { getAuth, signInAnonymously } from '@firebase/auth';
import { get, onDisconnect, serverTimestamp, set } from 'firebase/database';
import {
  bindRealtime,
  clientRef,
  ClientState,
  docRef,
  lastJoinedAtRef,
  realtimeRef,
} from 'realtime';
import { State, StateWithSpace } from 'state/constants';
import { subscribeClient } from './subscribeClient';

export async function registerClient(state: State, info: { clientId: string }) {
  const space = state.currentSpace;

  if (!space) {
    console.warn('[registerClient] blank currentSpace');
    return;
  }

  // if we have subscribed to realtime already
  // unbind it first
  space.subs[info.clientId]?.();

  try {
    await onDisconnect(clientRef(info.clientId)).remove();
  } catch (e) {
    console.error('[registerClient] failed to set onDisconnect');
  }

  try {
    const snapshot = await get(docRef(space.docId));

    const val = snapshot.val() as { [id: string]: ClientState };
    if (val) {
      const clients = Object.entries(val);
      for (const [clientId, clientState] of clients) {
        subscribeClient(state, { clientId, clientState });
      }
    }

    space.realtime = val || {};
  } catch (e) {
    console.error('[registerClient] failed to get and subscribe to clients', e);
  }

  try {
    const auth = getAuth();
    const { user } = await signInAnonymously(auth);
    try {
      await set(clientRef(info.clientId), {
        createdAt: serverTimestamp(),
        color: state.store.color,
        uid: user.uid,
      });
    } catch (e) {
      console.error('[registerClient] setting client failed', e);
    }
  } catch (e) {
    console.error('[registerClient] failed to auth');
  }

  space.subs[info.clientId] = bindRealtime(space.docId, state as StateWithSpace, info.clientId);

  await set(lastJoinedAtRef(space.docId, info.clientId), serverTimestamp());

  // this needs to be done after registerClient to ensure we have permissions to do it
  console.log('[registerClient] onDisconnect(realtimeRef);', info.clientId);
  await onDisconnect(realtimeRef(space.docId, info.clientId)).remove();
}
