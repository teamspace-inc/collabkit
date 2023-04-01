import { readFileSync, createWriteStream } from 'fs';
import http from 'http';
import path from 'path';

import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { ref, get, update, remove, set, serverTimestamp, push, Database } from 'firebase/database';

const DOC_ID = 'dddddddddddddddddddddddd';

const SAMPLE_DATA = Object.freeze({
  realtime: {
    bbbbbbbbbbbbbbbbbbbbbbbb: {},
    cccccccccccccccccccccccc: {},
    [DOC_ID]: {},
  },
  updates: {
    bbbbbbbbbbbbbbbbbbbbbbbb: {},
    cccccccccccccccccccccccc: {},
    [DOC_ID]: {},
  },
});

async function addSampleData() {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await context.database().ref().set(SAMPLE_DATA);
  });
}

const ANONYMOUS_UID = 'anonymous-uid';

function anonymousContext() {
  return testEnv.authenticatedContext(ANONYMOUS_UID, {
    provider_id: 'anonymous',
    firebase: {
      sign_in_provider: 'anonymous',
    },
  });
}

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-test',
    database: {
      rules: readFileSync(path.join(__dirname, '../database.rules.jsonc'), 'utf8'),
      host: 'localhost',
      port: 9000,
    },
  });
});

beforeEach(async () => {
  await testEnv.clearDatabase();
  await addSampleData();
});

it('should NOT let anyone read the root and reveal document IDs', async () => {
  const unauthenticatedDb = testEnv.unauthenticatedContext().database();
  await assertFails(get(ref(unauthenticatedDb)));
  await assertFails(get(ref(unauthenticatedDb, '/realtime')));
  await assertFails(get(ref(unauthenticatedDb, '/updates')));
  const anonymousDb = anonymousContext().database();
  await assertFails(get(ref(anonymousDb)));
  await assertFails(get(ref(anonymousDb, '/realtime')));
  await assertFails(get(ref(anonymousDb, '/updates')));
});

it('should NOT let anyone delete the root refs', async () => {
  const unauthenticatedDb = testEnv.unauthenticatedContext().database();
  await assertFails(remove(ref(unauthenticatedDb)));
  await assertFails(remove(ref(unauthenticatedDb, '/realtime')));
  await assertFails(remove(ref(unauthenticatedDb, '/updates')));
  const anonymousDb = anonymousContext().database();
  await assertFails(remove(ref(anonymousDb)));
  await assertFails(remove(ref(anonymousDb, '/realtime')));
  await assertFails(remove(ref(anonymousDb, '/updates')));
});

it('should block writes to arbitrary keys', async () => {
  const db = anonymousContext().database();
  await assertFails(set(ref(db, '/foo/bar'), 'hello world'));
});

describe('/clients', () => {
  let db: Database;

  beforeEach(async () => {
    db = anonymousContext().database();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context
        .database()
        .ref('/clients')
        .set({
          client1: { color: 'tomato', createdAt: serverTimestamp(), uid: 'user-1-uid' },
          client2: { color: 'teal', createdAt: serverTimestamp(), uid: 'user-2-uid' },
          myClient: { color: 'tomato', createdAt: serverTimestamp(), uid: ANONYMOUS_UID },
        });
    });
  });

  it('should NOT allow listing all clients', async () => {
    await assertFails(get(ref(db, '/clients')));
  });

  it('should allow fetching an arbitrary client by ID', async () => {
    await assertSucceeds(get(ref(db, '/clients/client1')));
  });

  it('should NOT allow modifying a client of another user', async () => {
    await assertFails(set(ref(db, '/clients/client1/color'), 'grass'));
    await assertFails(set(ref(db, '/clients/client1/createdAt'), serverTimestamp()));
    await assertFails(set(ref(db, '/clients/client1/uid'), ANONYMOUS_UID));
    await assertFails(remove(ref(db, '/clients/client1')));
  });

  it('should allow creating a client with your own uid', async () => {
    await assertSucceeds(
      set(ref(db, `/clients/myNewClient`), {
        createdAt: serverTimestamp(),
        color: 'indigo',
        uid: ANONYMOUS_UID,
      })
    );
  });

  it('should NOT allow creating invalid clients', async () => {
    const clientRef = ref(db, '/clients/myNewClient');
    // missing createdAt
    await assertFails(update(clientRef, { color: 'orange', uid: ANONYMOUS_UID }));
    // missing color
    await assertFails(update(clientRef, { createdAt: serverTimestamp(), uid: ANONYMOUS_UID }));
    // missing uid
    await assertFails(update(clientRef, { createdAt: serverTimestamp(), color: 'orange' }));
  });

  it('should allow modifying your own clients', async () => {
    await assertSucceeds(set(ref(db, '/clients/myClient/color'), 'pink'));
    await assertSucceeds(remove(ref(db, '/clients/myClient')));
  });

  it('should NOT allow modifying uid', async () => {
    await assertFails(set(ref(db, `/clients/myClient/uid`), 'another-uid'));
  });
});

describe('/realtime', () => {
  let db: Database;

  beforeEach(async () => {
    db = anonymousContext().database();
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context
        .database()
        .ref('/clients')
        .set({
          client1: { color: 'tomato', createdAt: serverTimestamp(), uid: 'user-1' },
          client2: { color: 'tomato', createdAt: serverTimestamp(), uid: 'user-2' },
          myClient: { color: 'pink', createdAt: serverTimestamp(), uid: ANONYMOUS_UID },
        });
    });
  });

  it('should allow anonymous users to read all realtime data by document ID', async () => {
    await assertSucceeds(get(ref(db, `/realtime/${DOC_ID}`)));
  });

  it('should NOT allow updating realtime data with non-existent client ID', async () => {
    await assertFails(
      update(ref(db, `/realtime/${DOC_ID}/notfound`), { selected: { item1: true } })
    );
  });

  it('should NOT allow updating realtime data of other users', async () => {
    await assertFails(
      update(ref(db, `/realtime/${DOC_ID}/client1`), { selected: { item1: true } })
    );
    await assertFails(remove(ref(db, `/realtime/${DOC_ID}/client2`)));
  });

  it('should allow updating own realtime data', async () => {
    const realtimeRef = ref(db, `/realtime/${DOC_ID}/myClient`);
    await assertSucceeds(update(realtimeRef, { selected: { item1: { type: 'shape' } } }));
    await assertSucceeds(
      update(realtimeRef, {
        camera: [-50, 400, 5, Date.now()],
        cursor: [120, 140, Date.now()],
        selectBox: [0, 0, 100, 200, Date.now()],
        selected: { item1: { type: 'shape' } },
      })
    );
    await assertSucceeds(
      update(realtimeRef, {
        drag: [10, 30, 1, Date.now()],
      })
    );
    await assertSucceeds(
      update(realtimeRef, {
        resize: [60, 70, true, 2, 7, Date.now()],
      })
    );
    await assertSucceeds(remove(realtimeRef));
  });

  it('should block invalid realtime data writes', async () => {
    const realtimeRef = ref(db, `/realtime/${DOC_ID}/myClient`);
    await assertFails(update(realtimeRef, { cursor: [1] }));
    await assertFails(update(realtimeRef, { drag: 'hello' }));
    await assertFails(update(realtimeRef, { selected: { item0: 'bogus' } }));
    await assertFails(update(realtimeRef, { camera: { bogus: true } }));
  });

  it('should NOT allow changing client data of another user', async () => {
    const realtimeRef = ref(db, `/realtime/${DOC_ID}/client2`);
    await assertSucceeds(get(realtimeRef));
    await assertFails(update(realtimeRef, { cursor: [999, 999, Date.now()] }));
  });
});

describe('/updates', () => {
  it('should allow anonymous users to read all updates by document ID', async () => {
    const db = anonymousContext().database();
    await assertSucceeds(get(ref(db, `/updates/${DOC_ID}`)));
  });

  const yUpdate = Object.freeze({
    cid: 123456,
    did: DOC_ID,
    id: 'vqUmUCeS',
    o: 'getXmlFragment',
    s: 1,
    t: serverTimestamp(),
    v: 1,
    u: 'AAAFuunw+gUAAAEnHRp0ZXh0c2tENEJscklwMTRiZEhFNkIzUWZ2dwUVAQEBBAABAQAA',
    uid: 'user1',
  });

  it('should allow pushing an update', async () => {
    const db = anonymousContext().database();
    await assertSucceeds(Promise.resolve(push(ref(db, `/updates/${DOC_ID}`), yUpdate)));
  });

  it('should block invalid update writes', async () => {
    const db = anonymousContext().database();
    const invalidUpdate = { ...yUpdate, u: null };
    await assertFails(Promise.resolve(push(ref(db, `/updates/${DOC_ID}`), invalidUpdate)));
  });

  it('should NOT allow modifying an update', async () => {
    const db = anonymousContext().database();
    const updateRef = await push(ref(db, `/updates/${DOC_ID}`), yUpdate);
    await assertFails(update(updateRef, { u: 'foo' }));
  });
});

afterAll(async () => {
  await testEnv.cleanup();

  // Write the coverage report to a file
  const coverageFile = 'database-coverage.html';
  const fstream = createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
    const { host, port } = testEnv.emulators.database!;
    const quotedHost = host.includes(':') ? `[${host}]` : host;
    http.get(
      `http://${quotedHost}:${port}/.inspect/coverage?ns=${testEnv.projectId}-default-rtdb`,
      (res) => {
        res.pipe(fstream, { end: true });

        res.on('end', resolve);
        res.on('error', reject);
      }
    );
  });

  console.log(`View database rule coverage information at ${coverageFile}\n`);
});
