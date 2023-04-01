import waitForExpect from 'wait-for-expect';
import { DatabaseReference, get, getDatabase, ref } from '@firebase/database';
import { Unsubscribe } from '@firebase/auth';

import { bindRealtime, cancelDrag, cancelResize, nextTransactionId } from '.';
import { createGlobalStore, createSpaceStore } from 'state/store';
import { ShapeTarget } from 'state/constants';
import { registerClient } from 'state/actions/realtime';

jest.mock('../environment');
jest.mock('../utils/setupLocalStorage.ts');

const LOG_PROGRESS = true;

describe('realtime', () => {
  let unsub: Unsubscribe | undefined;

  afterEach(() => {
    if (unsub) {
      unsub();
    }
  });

  test('propogates proxy changes to firebase', async () => {
    const TIMEOUT = 2000; // timeout for waitForExpect
    let globalStore = createGlobalStore();
    globalStore.spaces.doc1 = createSpaceStore('doc1');
    let store = globalStore.spaces.doc1;
    let realtimeRef: DatabaseReference;
    let clientRef: DatabaseReference;
    let tr1: number, tr2: number, tr3: number;

    unsub = bindRealtime('doc1', { store: globalStore, currentSpace: store }, globalStore.clientId);

    realtimeRef = ref(getDatabase(), `/realtime/doc1/${globalStore.clientId}`);

    clientRef = ref(getDatabase(), `/clients/${globalStore.clientId}`);

    await registerClient(
      { store: globalStore, currentSpace: store },
      { clientId: globalStore.clientId }
    );

    LOG_PROGRESS && console.log('register client');
    await waitForExpect(async () => {
      let snapshot = await get(clientRef);
      expect(snapshot.val()).toMatchObject({
        createdAt: expect.any(Number),
        color: globalStore.color,
        uid: expect.any(String),
      });
    }, TIMEOUT);

    await waitForExpect(async () => {
      let snapshot = await get(realtimeRef);
      expect(snapshot.val()).toMatchObject({
        lastJoinedAt: expect.any(Number),
      });
    }, TIMEOUT);

    LOG_PROGRESS && console.log('sync');
    const item1Target: ShapeTarget = { type: 'shape', id: 'item2' };
    globalStore.editing.selectedIds = [item1Target];
    store.pageState.camera = { point: [1, 2], zoom: 1 };
    globalStore.editing.editingId = { type: 'shape', id: 'item2' };
    store.cursor = [1, 2];

    await waitForExpect(async () => {
      let snapshot = await get(realtimeRef);
      const val = snapshot.val() || {};
      LOG_PROGRESS && console.log('wait', val);
      expect(val).toMatchObject({
        selected: { item2: { type: 'shape' } },
        editing: { id: 'item2', type: 'shape' },
        camera: [1, 2, 1, expect.any(Number)],
        cursor: [1, 2, expect.any(Number)],
        lastJoinedAt: expect.any(Number),
      });
    }, TIMEOUT);

    LOG_PROGRESS && console.log('delete');
    // deleting proxy values, removes them from firebase
    globalStore.editing.selectedIds = [];
    globalStore.editing.editingId = null;

    await waitForExpect(async () => {
      let snapshot = await get(realtimeRef);
      expect(snapshot.val()).toMatchObject({ lastJoinedAt: expect.any(Number) });
    }, TIMEOUT);

    LOG_PROGRESS && console.log('drag');
    // drag
    tr1 = nextTransactionId();
    store.optimistic.drag = [2, 3, tr1];

    await waitForExpect(async () => {
      let snapshot = await get(realtimeRef);
      expect(snapshot.val()).toMatchObject({
        drag: [2, 3, tr1, expect.any(Number)],
      });
    }, TIMEOUT);
    // });

    LOG_PROGRESS && console.log('stop drag');
    // // stop drag
    delete store.optimistic.drag;

    await waitForExpect(async () => {
      let snapshot = await get(realtimeRef);
      expect(snapshot.val()).toMatchObject({
        lastJoinedAt: expect.any(Number),
      });
    }, TIMEOUT);

    LOG_PROGRESS && console.log('drag again');
    // // drag again
    tr2 = nextTransactionId();
    store.optimistic.drag = [2, 4, tr2];

    await waitForExpect(async () => {
      let snapshot = await get(realtimeRef);
      expect(snapshot.val()).toMatchObject({
        drag: [2, 4, tr2, expect.any(Number)],
      });
    }, TIMEOUT);

    LOG_PROGRESS && console.log('cancel drag');
    // // cancel drag
    await cancelDrag('doc1', tr2, globalStore.clientId);
    delete store.optimistic.drag;

    await waitForExpect(async () => {
      let snapshot = await get(realtimeRef);
      expect(snapshot.val()).toMatchObject({
        cancellations: { [tr2]: true },
      });
    }, TIMEOUT);

    LOG_PROGRESS && console.log('resize');
    // // resize
    tr3 = nextTransactionId();
    store.optimistic.resize = [2, 4, true, tr3, 1];

    await waitForExpect(async () => {
      let snapshot = await get(realtimeRef);
      expect(snapshot.val()).toMatchObject({
        cancellations: { [tr2]: true },
        resize: [2, 4, true, tr3, 1, expect.any(Number)],
      });
    }, TIMEOUT);

    LOG_PROGRESS && console.log('cancel resize');
    await cancelResize('doc1', tr3, globalStore.clientId);
    delete store.optimistic.resize;

    await waitForExpect(async () => {
      let snapshot = await get(realtimeRef);
      expect(snapshot.val()).toMatchObject({
        cancellations: { [tr2]: true, [tr3]: true },
      });
    }, TIMEOUT);
  }, 10_000);
});
