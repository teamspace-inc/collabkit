jest.mock('../environment.ts');
jest.mock('../utils/setupLocalStorage.ts');

import { Doc } from 'yjs';
import { proxy } from 'valtio/vanilla';
import { bindDoc } from './bindDoc';
import { createGlobalStore } from 'state/store';

// import { deleteApp, initializeApp, getApps, FirebaseApp } from '@firebase/app';
// import { getDatabase, goOffline, ref, set } from '@firebase/database';
import { Binding, State } from 'state/constants';
import { nanoid } from 'nanoid';

import waitForExpect from 'wait-for-expect';
import { VERSION } from './schema';

// export function initFirebase() {
//   let databaseURL = process.env['TEST_FIREBASE_DATABASE_URL'];
//   if (!databaseURL) {
//     throw new Error('TEST_FIREBASE_DATABASE_URL is blank, tests may fail');
//   }

//   let app: FirebaseApp;
//   if (getApps().length === 0) {
//     app = initializeApp({
//       apiKey: 'AIzaSyAMSexET9tWqknx-gUQ0b4A7ggbV_ROk2k',
//       authDomain: 'bind-test-423f4.firebaseapp.com',
//       databaseURL,
//       projectId: 'bind-test-423f4',
//       storageBucket: 'bind-test-423f4.appspot.com',
//       messagingSenderId: '92226600078',
//       appId: '1:92226600078:web:05dd9207d01e9ae6c85ddf',
//     });
//   } else {
//     app = getApps()[0];
//   }
//   return app;
// }

// const app = initFirebase();

// afterEach(async () => {
//   await set(ref(getDatabase()), null);
// });

// afterAll(async () => {
//   goOffline(getDatabase());
//   await deleteApp(app);
// });

describe('bindDoc', () => {
  let doc: Doc, binding: Binding, state: State, guid: string;

  beforeEach(() => {
    guid = nanoid();
    doc = new Doc({ guid });
    state = proxy({ store: createGlobalStore() });
    binding = bindDoc(doc, 'space', state, VERSION, {});
  });

  afterEach(() => {
    binding.unsubscribe();
  });

  // coincidently this is also a test that the migrations work
  test('load', async () => {
    await binding.load();
    expect(doc.getMap('meta').get('version')).toBe(1);
    expect(doc.getMap('meta').get('type')).toBe('space');
  });

  test('sync', async () => {
    const doc2 = new Doc({ guid });
    const binding2 = bindDoc(doc2, 'space', state, VERSION, {});
    await binding2.load();

    doc2.transact(() => {
      doc2.getMap('foo').set('bar', 'baz');
    }, 'test');

    await binding.load();
    await binding.subscribe();

    await waitForExpect(() => {
      expect(doc.getMap('foo').get('bar')).toBe('baz');
    }, 1000);

    binding2.unsubscribe();
  });

  test('old app', async () => {
    expect(state.store.readOnly).toBe(false);
    expect(state.store.promptToRefresh).toBe(false);

    const version2 = {
      space: 3,
      card: 1,
    };

    const doc2 = new Doc({ guid });
    const binding2 = bindDoc(doc2, 'space', state, version2, {});
    await binding2.load();

    doc2.transact(() => {
      doc2.getMap('foo').set('bar', 'baz');
    }, 'test');

    await binding.load();
    await binding.subscribe();

    await waitForExpect(() => {
      expect(doc.getMap('foo').get('bar')).toBe(undefined);
      expect(state.store.readOnly).toBe(true);
      expect(state.store.promptToRefresh).toBe(true);
    }, 1000);

    binding2.unsubscribe();
  });
});
