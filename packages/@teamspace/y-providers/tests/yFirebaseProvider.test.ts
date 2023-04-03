import * as Y from 'yjs';
import { yFirebase, YFirebaseProvider } from '../src/index';
import waitForExpect from 'wait-for-expect';
import { nanoid } from 'nanoid';

describe('YFirebaseProvider', () => {
  const originalConsoleError = global.console.error;
  beforeAll(() => {
    global.console.error = (...args: any[]) => {
      if (
        args[0] === '[y.loadUpdates error]' &&
        args[1]?.message === ' << ignore expected test error >> '
      ) {
        return;
      }
      originalConsoleError(...args);
    };
  });

  afterAll(() => {
    global.console.error = originalConsoleError;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('syncs docs', async () => {
    const guid = 'a';

    const a = new Y.Doc({ guid });
    const b = new Y.Doc({ guid });

    const path = '/updates';
    const userId = 'user1';

    const pa = new YFirebaseProvider({
      path,
      doc: a,
      userId,
    });

    const pb = new YFirebaseProvider({
      path,
      doc: b,
      userId,
    });

    await pa.load();

    a.transact(() => {
      a.getMap('foo').set('hello', 'world');
    }, 'client1');

    await pb.load();

    await waitForExpect(() => {
      expect(b.getMap('foo').get('hello')).toStrictEqual('world');
    });

    a.destroy();
    b.destroy();
  });

  test('one Y.Doc to another, regardless of userId', async () => {
    const guid = 'b';

    const a = new Y.Doc({ guid });
    const b = new Y.Doc({ guid });

    const path = '/updates';
    const userId = 'user1';

    const pa = new YFirebaseProvider({
      path,
      doc: a,
      userId,
    });

    const pb = new YFirebaseProvider({
      path,
      doc: b,
      userId: 'user-2',
    });

    await pa.load();

    a.transact(() => {
      a.getMap('foo').set('hello', 'world');
    }, 'origin-1');

    await pb.load();

    await waitForExpect(() => {
      expect(b.getMap('foo').get('hello')).toStrictEqual('world');
    });

    a.destroy();
    b.destroy();
  });

  test('syncs changes between three Y.Docs', async () => {
    const a = new Y.Doc({ guid: 'doc1' });
    const b = new Y.Doc({ guid: 'doc1' });
    const c = new Y.Doc({ guid: 'doc1' });

    const path = `${nanoid()}`;
    const u1 = 'user1';
    const u2 = 'user2';
    const u3 = 'user3';

    const ap = new YFirebaseProvider({
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

    const bp = new YFirebaseProvider({
      path,
      doc: b,
      userId: u2,
    });

    await bp.load();

    b.transact(() => {
      const map = b.getMap('foo');
      map.set('item1', 'green');
    }, 'anyt');

    b.transact(() => {
      const map = b.getMap('foo');
      map.set('item4', 'yellow');
    }, '123123');

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

    const cp = new YFirebaseProvider({
      path,
      doc: c,
      userId: u3,
    });

    await cp.load();

    const updates = await cp.fetch();
    expect(updates.length).toBeGreaterThan(0);

    c.transact(() => {
      const map = c.getMap('foo');
      map.set('item1', 'violet');
      map.set('item0', 'orange');
    }, 'client3');

    await waitForExpect(() => {
      // console.log('.');
      // const bMap = b.getMap('foo').toJSON();
      const cMap = c.getMap('foo').toJSON();
      // const aMap = a.getMap('foo').toJSON();

      expect(cMap).toStrictEqual({
        item1: expect.any(String),
        item2: 'blue',
        item4: 'yellow',
        item0: 'orange',
      });

      // expect(bMap).toStrictEqual(cMap);
      // expect(aMap).toStrictEqual(cMap);
    }, 1000);

    ap.destroy();
    bp.destroy();
    cp.destroy();
    a.destroy();
    b.destroy();
    c.destroy();
  });

  test('applies updates when getUpdates is called', async () => {
    const guid = 'somedoc';
    const origin = 'origin-1';
    const a = new Y.Doc({ guid, autoLoad: true });

    const path = '/u';
    const userId = 'user1';

    const pa = new YFirebaseProvider({
      path,
      doc: a,
      userId,
    });

    await pa.load();

    a.transact(() => {
      a.getMap('foo').set('hello', 'world');
    }, origin);

    a.transact(() => {
      a.getMap('bar').set('foo', 'world');
    }, origin);

    a.transact(() => {
      a.getMap('baz').set('foo', 'world');
    }, origin);

    const b = new Y.Doc({ guid });

    const pb = new YFirebaseProvider({
      path,
      doc: b,
      userId: 'user-2',
    });

    await pb.load();

    expect(b.getMap('foo').get('hello')).toStrictEqual('world');
    expect(b.getMap('bar').get('foo')).toStrictEqual('world');
    expect(b.getMap('baz').get('foo')).toStrictEqual('world');

    a.destroy();
    b.destroy();
  });

  test('emits disconnect and reconnect events as firebase onConnection changes', async () => {
    const doc = new Y.Doc({ guid: 'a123' });

    const path = `3${nanoid()}`;
    const userId = 'user2';

    const mockYFirebase: typeof yFirebase = {
      del: () => {
        return Promise.resolve();
      },

      subscribe: () => {
        return () => {};
      },

      push: async () => {
        throw new Error(' << ignore expected test error >> ');
      },

      fetch: () => {
        throw new Error(' << ignore expected test error >> ');
      },

      onConnection: (onChange) => {
        setTimeout(() => {
          onChange(false);
          onChange(true);
          // connect

          onChange(false);
          // disconnect
        }, 250);
        return () => {};
      },
    };

    const provider = new YFirebaseProvider({
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
  });

  test('compact', async () => {
    const guid = 'compressdoc';
    const doc = new Y.Doc({ guid });
    const origin = 'origin-1';

    const path = '/u';
    const userId = 'user1';

    const provider = new YFirebaseProvider({
      path,
      doc,
      userId,
    });

    await provider.load();

    doc.transact(() => {
      doc.getMap('foo').set('hello', 'world');
    }, origin);

    doc.transact(() => {
      doc.getMap('bar').set('foo', 'world');
    }, origin);

    doc.transact(() => {
      doc.getMap('baz').set('foo', 'world');
    }, origin);

    jest.useFakeTimers();
    provider._unsavedUpdateCount = 21;
    provider.compact();
    jest.advanceTimersByTime(10_000);
    jest.useRealTimers();

    const data = await yFirebase.fetch(provider.docPath, null);
    expect(data.length).toBe(4);

    {
      const doc = new Y.Doc({ guid });
      Y.applyUpdateV2(doc, data[3].u);

      expect(doc.getMap('foo').get('hello')).toStrictEqual('world');
      expect(doc.getMap('bar').get('foo')).toStrictEqual('world');
      expect(doc.getMap('baz').get('foo')).toStrictEqual('world');

      doc.destroy();
    }

    doc.destroy();
  });
});
