import admin from 'firebase-admin';
import path from 'path';
import os from 'os';

async function run() {
  const appId = process.argv[2];
  const workspaceId = process.argv[3];
  const threadId = process.argv[4];

  admin.initializeApp({
    credential: admin.credential.cert(
      path.join(os.homedir(), 'collabkit-dev-service-account.json')
    ),
    databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
  });

  const thread = await (
    await admin.database().ref(`timeline/${appId}/${workspaceId}/${threadId}`).get()
  ).val();

  console.log(thread);

  process.exit(0);
}

run();
