import * as Y from 'yjs';
import { YIDBProvider } from '../src/index';
import waitForExpect from 'wait-for-expect';

describe('YIDBProvider', () => {
  test('syncs state between Y.Docs', async () => {
    const guid = 'a';

    const a = new Y.Doc({ guid });
    const b = new Y.Doc({ guid });

    const path = '/updates/2';
    const userId = 'user1';

    const ap = new YIDBProvider({
      path,
      doc: a,
      userId,
    });

    await ap.load();

    const bp = new YIDBProvider({
      path,
      doc: b,
      userId,
    });

    a.transact(() => {
      a.getMap('foo').set('hello', 'world');
    }, 'client1');

    await bp.load();

    await waitForExpect(() => {
      expect(b.getMap('foo').get('hello')).toStrictEqual('world');
    }, 250);

    a.destroy();
    b.destroy();
  });

  test('can delete local data by calling clear', async () => {
    const a = new Y.Doc({ guid: 'a', autoLoad: true });

    const path = '/updates/2';
    const userId = 'user1';

    const ap = new YIDBProvider({
      path,
      doc: a,
      userId,
    });

    await ap.load();

    a.transact(() => {
      a.getMap('foo').set('hello', 'world');
    }, 'client1');

    await waitForExpect(() => {
      expect(a.getMap('foo').get('hello')).toStrictEqual('world');
    }, 250);

    await ap.deleteLocalData();

    const b = new Y.Doc({ guid: 'a', autoLoad: true });

    const bp = new YIDBProvider({
      path,
      doc: b,
      userId,
    });

    await bp.load();

    await waitForExpect(() => {
      expect(b.getMap('foo').toJSON()).toStrictEqual({});
    }, 250);

    a.destroy();
    b.destroy();
  });
});
