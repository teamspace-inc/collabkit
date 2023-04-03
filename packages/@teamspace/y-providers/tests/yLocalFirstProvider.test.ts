import * as Y from 'yjs';
import { YLocalFirstProvider } from '../src/yLocalFirstProvider';
import waitForExpect from 'wait-for-expect';
import { yFirebase } from '../src/yFirebase';
import { YSyncState } from '../src/types';
import { yIDB } from '../src';
import { nanoid } from 'nanoid';

const mockYFirebase = Object.assign({}, yFirebase);
mockYFirebase.push = () => {
  throw new Error('failed');
};

const mockYIDB = Object.assign({}, yIDB);
mockYIDB.update = () => {
  throw new Error('failed');
};

describe('YLocalFirstProvider', () => {
  const originalConsoleError = global.console.error;
  beforeAll(() => {
    global.console.error = (...args: any[]) => {
      if (args[0] === '[y.push fatal IDB & Firebase push failed]') {
        return;
      }
      originalConsoleError(...args);
    };
  });

  afterAll(() => {
    global.console.error = originalConsoleError;
  });

  test('syncs changes from one Y.Doc to another', async () => {
    const a = new Y.Doc({ guid: 'doc12' });
    const b = new Y.Doc({ guid: 'doc12' });

    const path = `1${nanoid()}`;
    const userId = 'user1';

    const ap = new YLocalFirstProvider({
      path,
      doc: a,
      userId,
    });

    await ap.load();

    a.transact(() => {
      a.getMap('foo').set('hello', 'world');
    }, 'client1');

    const bp = new YLocalFirstProvider({
      path,
      doc: b,
      userId,
    });

    await bp.load();

    await waitForExpect(() => {
      expect(b.getMap('foo').get('hello')).toStrictEqual('world');
    });

    ap.destroy();
    bp.destroy();
    a.destroy();
    b.destroy();
  });

  test('syncs changes from one Y.Doc to another (ongoing)', async () => {
    const a = new Y.Doc({ guid: 'doc123' });
    const b = new Y.Doc({ guid: 'doc123' });

    const path = `1${nanoid()}`;
    const userId = 'user1';

    const ap = new YLocalFirstProvider({
      path,
      doc: a,
      userId,
    });

    await ap.load();

    a.transact(() => {
      a.getMap('foo').set('hello', 'world');
    }, 'client1');

    const bp = new YLocalFirstProvider({
      path,
      doc: b,
      userId: 'user2',
    });

    await bp.load();

    await waitForExpect(() => {
      expect(b.getMap('foo').get('hello')).toStrictEqual('world');
    }, 250);

    a.transact(() => {
      a.getMap('bar').set('hello', 'world');
    }, 'client1');

    await waitForExpect(() => {
      expect(b.getMap('bar').get('hello')).toStrictEqual('world');
    }, 250);

    a.transact(() => {
      a.getMap('foo').set('hello', 'mars');
    }, 'client1');

    await waitForExpect(() => {
      expect(b.getMap('foo').get('hello')).toStrictEqual('mars');
    }, 250);

    b.transact(() => {
      b.getMap('foo').set('hello', 'venus');
    }, 'client2');

    await waitForExpect(() => {
      expect(a.getMap('foo').get('hello')).toStrictEqual('venus');
    }, 250);

    ap.destroy();
    bp.destroy();
    a.destroy();
    b.destroy();
  });

  test('syncs changes between three Y.Docs', async () => {
    const a = new Y.Doc({ guid: 'doc1' });
    const b = new Y.Doc({ guid: 'doc1' });
    const c = new Y.Doc({ guid: 'doc1' });

    const path = `1${nanoid()}`;
    const u1 = 'user1';
    const u2 = 'user2';
    const u3 = 'user3';

    const ap = new YLocalFirstProvider({
      path,
      doc: a,
      userId: u1,
    });

    await ap.load();

    a.transact(() => {
      const map = a.getMap('foo');
      map.set('item1', 'red');
      map.set('item2', 'blue');
    }, 'client1');

    const bp = new YLocalFirstProvider({
      path,
      doc: b,
      userId: u2,
    });

    await bp.load();

    b.transact(() => {
      const map = b.getMap('foo');
      map.set('item1', 'green');
      map.set('item4', 'yellow');
    }, 'client2');

    await waitForExpect(() => {
      const map = b.getMap('foo').toJSON();
      expect(map).toStrictEqual({
        item1: expect.any(String),
        item2: 'blue',
        item4: 'yellow',
      });
      try {
        expect(map.item1).toBe('green');
      } catch {
        expect(map.item1).toBe('red');
      }
    }, 250);

    const cp = new YLocalFirstProvider({
      path,
      doc: c,
      userId: u3,
    });

    await cp.load();

    c.transact(() => {
      const map = c.getMap('foo');
      map.set('item1', 'violet');
      map.set('item0', 'orange');
    }, 'client3');

    await waitForExpect(() => {
      const cMap = c.getMap('foo').toJSON();

      expect(cMap).toStrictEqual({
        item1: expect.any(String),
        item2: 'blue',
        item4: 'yellow',
        item0: 'orange',
      });
    }, 250);

    // eventually consistent
    await waitForExpect(() => {
      const bMap = b.getMap('foo').toJSON();
      const cMap = c.getMap('foo').toJSON();
      const aMap = a.getMap('foo').toJSON();

      expect(bMap).toStrictEqual(cMap);
      expect(aMap).toStrictEqual(cMap);
    }, 250);

    ap.destroy();
    bp.destroy();
    cp.destroy();
    a.destroy();
    b.destroy();
    c.destroy();
  });

  test('handles fatal errors', async () => {
    const a = new Y.Doc({ guid: 'a109' });

    const path = `2${nanoid()}`;
    const userId = 'user1';

    const ap = new YLocalFirstProvider({
      path,
      doc: a,
      userId,
    });

    ap._yFirebase = mockYFirebase;
    ap._yIDB = mockYIDB;

    await ap.load();

    a.transact(() => {
      a.getMap('foo').set('hello', 'world');
    }, 'client1');

    a.transact(() => {
      a.getMap('bar').set('hello', 'world');
    }, 'client1');

    const savedFn = jest.fn();
    const retryFn = jest.fn();
    const errorFn = jest.fn();

    ap.on('saved', savedFn);
    ap.on('retry-pending-and-saved-success', retryFn);
    ap.on('error', errorFn);

    await waitForExpect(async () => {
      const updates = await ap.loadUpdates();
      const stats = ap.getStats(Array.from(updates.values()));
      expect(stats.get(YSyncState.Pending)).toStrictEqual(0);
      expect(stats.get(YSyncState.Synced)).toStrictEqual(0);
      expect(stats.get(YSyncState.SavedLocally)).toStrictEqual(0);
      expect(savedFn).toHaveBeenCalledTimes(0);
      expect(errorFn).toHaveBeenCalledTimes(2);
      expect(retryFn).toHaveBeenCalledTimes(0);
    }, 250);

    ap._yFirebase = yFirebase;
    ap._yIDB = yIDB;

    await ap.load();

    await waitForExpect(async () => {
      const updates2 = await ap.loadUpdates();
      const stats2 = ap.getStats(Array.from(updates2.values()));
      expect(stats2.get(YSyncState.SavedLocally)).toStrictEqual(0);
      expect(stats2.get(YSyncState.Pending)).toStrictEqual(0);
      expect(stats2.get(YSyncState.Synced)).toStrictEqual(0);
      expect(retryFn).toHaveBeenCalledTimes(0);
      expect(savedFn).toHaveBeenCalledTimes(0);
      expect(errorFn).toHaveBeenCalledTimes(2);
    }, 250);

    ap.destroy();
    a.destroy();
    yIDB.clear(ap._db);
  });

  test('y and syncs them on reconnect', async () => {
    const a = new Y.Doc({ guid: 'a109' });

    const path = `2${nanoid()}`;
    const userId = 'user1';

    const ap = new YLocalFirstProvider({
      path,
      doc: a,
      userId,
    });

    ap._yFirebase = mockYFirebase;

    await ap.load();

    a.transact(() => {
      a.getMap('foo').set('hello', 'world');
    }, 'client1');

    a.transact(() => {
      a.getMap('bar').set('hello', 'world');
    }, 'client1');

    const savedFn = jest.fn();
    const retrySuccessFn = jest.fn();

    ap.on('saved', savedFn);
    ap.on('retry-pending-and-saved-success', retrySuccessFn);

    await waitForExpect(async () => {
      const updates = await ap.loadUpdates();
      const stats = ap.getStats(Array.from(updates.values()));
      expect(stats.get(YSyncState.Pending)).toStrictEqual(0);
      expect(stats.get(YSyncState.Synced)).toStrictEqual(0);
      expect(stats.get(YSyncState.SavedLocally)).toStrictEqual(2);
      expect(savedFn).toHaveBeenCalledTimes(2);
    }, 250);

    ap._yFirebase = yFirebase;

    await ap.load();

    await waitForExpect(async () => {
      const updates2 = await ap.loadUpdates();
      const stats2 = ap.getStats(Array.from(updates2.values()));
      expect(stats2.get(YSyncState.SavedLocally)).toStrictEqual(0);
      expect(stats2.get(YSyncState.Pending)).toStrictEqual(0);
      expect(stats2.get(YSyncState.Synced)).toStrictEqual(2);
      expect(retrySuccessFn).toHaveBeenCalledTimes(1);
    }, 250);

    ap.destroy();
    a.destroy();
    yIDB.clear(ap._db);
  });

  test('persists failures across doc & provider instances, and syncs them on reconnect', async () => {
    const doc = new Y.Doc({ guid: 'a123' });

    const path = `3${nanoid()}`;
    const userId = 'user2';

    const provider = new YLocalFirstProvider({
      path,
      doc,
      userId,
    });

    provider._yFirebase = mockYFirebase;

    await provider.load();

    doc.transact(() => {
      doc.getMap('foo').set('hello', 'world');
    }, 'user123');

    await waitForExpect(async () => {
      const updates = await provider.loadUpdates();
      const stats = provider.getStats(Array.from(updates.values()));
      expect(stats.get(YSyncState.Pending)).toStrictEqual(0);
      expect(stats.get(YSyncState.SavedLocally)).toStrictEqual(1);
      expect(stats.get(YSyncState.Synced)).toStrictEqual(0);
    }, 500);

    const doc2 = new Y.Doc({ guid: 'a123' });
    const provider2 = new YLocalFirstProvider({
      path,
      doc: doc2,
      userId,
    });

    await provider2.load();

    await waitForExpect(async () => {
      const updates2 = await provider2.loadUpdates();
      const stats2 = provider2.getStats(Array.from(updates2.values()));
      expect(stats2.get(YSyncState.Pending)).toStrictEqual(0);
      expect(stats2.get(YSyncState.SavedLocally)).toStrictEqual(0);
      expect(stats2.get(YSyncState.Synced)).toStrictEqual(1);
      expect(doc2.getMap('foo').get('hello')).toStrictEqual('world');
    }, 500);

    provider.destroy();
    doc.destroy();
    yIDB.clear(provider._db);

    provider2.destroy();
    doc2.destroy();
    yIDB.clear(provider2._db);
  });

  test('emits disconnect and reconnect events as firebase onConnection changes', async () => {
    const doc = new Y.Doc({ guid: 'a123' });

    const path = `3${nanoid()}`;
    const userId = 'user2';

    const mockYFirebase = Object.assign({}, yFirebase);
    mockYFirebase.onConnection = (onChange) => {
      setTimeout(() => {
        onChange(false);
        onChange(true);
        // connect

        onChange(false);
        // disconnect
      }, 250);
      return () => {};
    };

    const provider = new YLocalFirstProvider({
      path,
      doc,
      userId,
    });

    provider._yFirebase = mockYFirebase;

    const onDisconnect = jest.fn();
    provider.on('disconnect', onDisconnect);

    const onConnect = jest.fn();
    provider.on('connect', onConnect);

    await provider.load();

    expect(onDisconnect).toHaveBeenCalledTimes(1);
    expect(onConnect).toHaveBeenCalledTimes(1);

    provider.destroy();
    yIDB.clear(provider._db);
  });

  test('should push', () => {
    const a = new Y.Doc({ guid: 'somedoc2' });

    const path = '/u213213';
    const userId = 'user1';

    const fa = new YLocalFirstProvider({
      path,
      doc: a,
      userId,
    });

    expect(fa.shouldPush(this)).toBeFalsy();
    expect(fa.shouldPush(fa)).toBeFalsy();
    expect(fa.shouldPush(a.clientID)).toBeFalsy();
    expect(fa.shouldPush('some string')).toBe(true);
    expect(fa.shouldPush({})).toBe(true);
  });

  test('compact', async () => {
    const guid = 'somedoc3';
    const doc = new Y.Doc({ guid });
    const origin = 'origin-11';

    const path = '/u213213';
    const userId = 'user1';

    const provider = new YLocalFirstProvider({
      path,
      doc,
      userId,
    });

    const onSynced = jest.fn();
    provider.on('synced', onSynced);

    await provider.load();

    await waitForExpect(() => {
      expect(onSynced).toHaveBeenCalledTimes(1);
    }, 250);

    doc.transact(() => {
      doc.getMap('foo').set('hello', 'world');
    }, origin);

    doc.transact(() => {
      doc.getMap('bar').set('foo', 'world');
    }, origin);

    doc.transact(() => {
      doc.getMap('baz').set('foo', 'world');
    }, origin);

    expect(doc.getMap('foo').get('hello')).toStrictEqual('world');

    provider._unsavedUpdateCount = 21;
    await provider._compact();

    // ensure previous updates have been removed from idb
    expect(provider._db).toBeTruthy();
    const idbUpdates = await yIDB.fetch(provider._db);
    expect(idbUpdates.length).toBe(1);
    expect(idbUpdates[0].iid).toBe(4);

    // ensure compressed update reflects all prior state
    // -- try by loading the update directly
    {
      await waitForExpect(async () => {
        const data = await yFirebase.fetch(provider.docPath, null);
        expect(data.length).toBe(4);

        const doc = new Y.Doc({ guid });
        Y.applyUpdateV2(doc, data[data.length - 1].u);

        expect(doc.getMap('foo').get('hello')).toStrictEqual('world');
        expect(doc.getMap('bar').get('foo')).toStrictEqual('world');
        expect(doc.getMap('baz').get('foo')).toStrictEqual('world');

        doc.destroy();
      }, 250);
    }

    // -- try by fetching latest updates
    {
      await waitForExpect(async () => {
        const doc = new Y.Doc({ guid });
        const provider = new YLocalFirstProvider({ path, doc, userId });
        await provider.load();

        expect(doc.getMap('foo').get('hello')).toStrictEqual('world');
        expect(doc.getMap('bar').get('foo')).toStrictEqual('world');
        expect(doc.getMap('baz').get('foo')).toStrictEqual('world');

        doc.destroy();
      }, 250);
    }

    doc.destroy();
  });
});
