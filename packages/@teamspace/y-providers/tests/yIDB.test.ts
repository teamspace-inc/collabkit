import { yIDB } from '../src/index';
import { YSyncState } from '../src/types';

describe('yIDB', () => {
  test('put & get yUpdate', async () => {
    const db = await yIDB.open('somepath');
    const id = '12';
    const data = {
      cid: 1,
      did: 'doc1',
      s: YSyncState.Pending,
      id,
      u: new Uint8Array(),
      uid: 'user1',
    };

    await yIDB.put(db, data);
    const fetchedData = await yIDB.get(db, id);
    data['iid'] = 1;
    expect(fetchedData).toStrictEqual(data);
  });

  test('put & fetch yUpdate', async () => {
    const db = await yIDB.open('docPath');
    const updates = [
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '101',
        iid: 1,
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '102',
        iid: 2,
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '103',
        iid: 3,
        u: new Uint8Array(),
        uid: 'user1',
      },
    ];

    await yIDB.put(db, updates[0]);
    await yIDB.put(db, updates[1]);
    await yIDB.put(db, updates[2]);

    const fetchedUpdates = await yIDB.fetch(db);

    expect(fetchedUpdates).toStrictEqual(updates);
  });

  test('put, update & fetch yUpdate', async () => {
    const db = await yIDB.open('apath');
    const updates = [
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '1',
        iid: 1,
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '2',
        iid: 2,
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '3',
        iid: 3,
        u: new Uint8Array(),
        uid: 'user1',
      },
    ];

    await yIDB.put(db, updates[0]);
    await yIDB.put(db, updates[1]);
    await yIDB.put(db, updates[2]);

    const fetchedUpdates = await yIDB.fetch(db);
    expect(fetchedUpdates).toStrictEqual(updates);

    yIDB.update(db, '3', { ...updates[2], s: YSyncState.Synced });

    const fetchedData = await yIDB.get(db, '3');
    updates[2].s = YSyncState.Synced;
    expect(fetchedData).toStrictEqual(updates[2]);
  });

  test('put & del: keyrange', async () => {
    const db = await yIDB.open('apath');
    const updates = [
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '201',
        iid: 1,
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '202',
        iid: 2,
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '203',
        iid: 3,
        u: new Uint8Array(),
        uid: 'user1',
      },
    ];

    await yIDB.put(db, updates[0]);
    await yIDB.put(db, updates[1]);
    await yIDB.put(db, updates[2]);

    await yIDB.del(db, IDBKeyRange.upperBound(2));

    const remainingUpdates = [updates[2]];

    const fetchedUpdates = await yIDB.fetch(db);
    expect(fetchedUpdates).toStrictEqual(remainingUpdates);
  });
});
