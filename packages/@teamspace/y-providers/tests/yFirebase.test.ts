import { validateFirebaseUpdate, validateUpdate, yFirebase } from '../src/index';
import { YSyncState } from '../src/types';

describe('yFirebase', () => {
  describe('validateUpdate', () => {
    test('valid', () => {
      const update = {
        u: new Uint8Array(),
        uid: 'user1',
        cid: '123213',
        did: 'anyDoc1',
      };

      expect(validateUpdate(update)).toBeTruthy();
    });

    test('no u.', () => {
      const update = {
        uid: 'user1',
        cid: '123213',
        did: 'anyDoc1',
      };

      expect(validateUpdate(update)).toBeFalsy();
    });

    test('no uid.', () => {
      const update = {
        u: new Uint8Array(),
        cid: '123213',
        did: 'anyDoc1',
      };

      expect(validateUpdate(update)).toBeFalsy();
    });

    test('no cid.', () => {
      const update = {
        u: new Uint8Array(),
        uid: '123213',
        did: 'anyDoc1',
      };

      expect(validateUpdate(update)).toBeFalsy();
    });

    test('no did.', () => {
      const update = {
        u: new Uint8Array(),
        cid: '12321322',
        uid: '123213',
      };

      expect(validateUpdate(update)).toBeFalsy();
    });
  });

  describe('validateFirebaseUpdate', () => {
    test('valid', () => {
      const update = {
        u: '',
        uid: 'user1',
        cid: '123213',
        did: 'anyDoc1',
      };

      expect(validateFirebaseUpdate(update)).toBeTruthy();
    });

    test('no u.', () => {
      const update = {
        uid: 'user1',
        cid: '123213',
        did: 'anyDoc1',
      };

      expect(validateFirebaseUpdate(update)).toBeFalsy();
    });

    test('no uid.', () => {
      const update = {
        u: new Uint8Array(),
        cid: '123213',
        did: 'anyDoc1',
      };

      expect(validateFirebaseUpdate(update)).toBeFalsy();
    });

    test('no cid.', () => {
      const update = {
        u: new Uint8Array(),
        uid: '123213',
        did: 'anyDoc1',
      };

      expect(validateFirebaseUpdate(update)).toBeFalsy();
    });

    test('no did.', () => {
      const update = {
        u: new Uint8Array(),
        cid: '12321322',
        uid: '123213',
      };

      expect(validateFirebaseUpdate(update)).toBeFalsy();
    });
  });

  test('push, fetch, & fetch sets s to Synced', async () => {
    const id = '12';
    const data = {
      cid: 1,
      did: 'doc1',
      s: YSyncState.Pending,
      id,
      u: new Uint8Array(),
      uid: 'user1',
    };

    const firebaseId = await yFirebase.push('somepath', data);
    const fetchedData = await yFirebase.fetch('somepath', firebaseId);

    expect(fetchedData[0].cid).toStrictEqual(data.cid);
    expect(fetchedData[0].did).toStrictEqual(data.did);
    expect(fetchedData[0].s).toStrictEqual(YSyncState.Synced);
    expect(fetchedData[0].id).toStrictEqual(data.id);
    expect(fetchedData[0].u).toStrictEqual(data.u);
    expect(fetchedData[0].uid).toStrictEqual(data.uid);
  });

  test('subscribe', async () => {
    const id = '12';
    const data = {
      cid: 1,
      did: 'doc1',
      s: YSyncState.Pending,
      id,
      u: new Uint8Array(),
      uid: 'user1',
    };

    const onUpdateMock = jest.fn((update) => {
      expect(update.cid).toStrictEqual(data.cid);
      expect(update.did).toStrictEqual(data.did);
      expect(update.s).toStrictEqual(YSyncState.Synced);
      expect(update.id).toStrictEqual(data.id);
      expect(update.u).toStrictEqual(data.u);
      expect(update.uid).toStrictEqual(data.uid);
    });
    yFirebase.subscribe('newpath', null, onUpdateMock);
    await yFirebase.push('newpath', data);
    expect(onUpdateMock).toHaveBeenCalledTimes(1);
  });

  test('subscribe & startAt', async () => {
    const updates = [
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '1',
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '2',
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '3',
        u: new Uint8Array(),
        uid: 'user1',
      },
    ];

    const keys = await Promise.all(updates.map((u) => yFirebase.push('anotherpath', u)));
    const fetchedUpdates = await yFirebase.fetch('anotherpath', keys[1]);
    expect(fetchedUpdates.length).toBe(2);
    expect(fetchedUpdates[0].id).toStrictEqual('2');
    expect(fetchedUpdates[1].id).toStrictEqual('3');
  });

  test('del', async () => {
    const path = 'apath';
    const updates = [
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '1',
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '2',
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '3',
        u: new Uint8Array(),
        uid: 'user1',
      },
      {
        cid: 1,
        did: 'doc1',
        s: YSyncState.Pending,
        id: '4',
        u: new Uint8Array(),
        uid: 'user1',
      },
    ];

    const keys = await Promise.all(updates.map((u) => yFirebase.push(path, u)));

    // fetch all updates after 1
    const fetchedUpdates = await yFirebase.fetch(path, keys[1]);
    expect(fetchedUpdates.length).toBe(3);
    expect(fetchedUpdates[0].id).toStrictEqual('2');
    expect(fetchedUpdates[1].id).toStrictEqual('3');
    expect(fetchedUpdates[2].id).toStrictEqual('4');

    await yFirebase.del(path, new Set([keys[1], keys[3]]));
    const afterDeleteUpdates = await yFirebase.fetch(path, null);
    expect(afterDeleteUpdates.length).toBe(2);
    expect(afterDeleteUpdates[0].id).toStrictEqual('1');
    expect(afterDeleteUpdates[1].id).toStrictEqual('3');
  });
});
