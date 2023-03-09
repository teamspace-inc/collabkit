import admin from 'firebase-admin';
import os from 'os';
import path from 'path';

async function run() {
  admin.initializeApp({
    credential: admin.credential.cert(
      path.join(os.homedir(), 'collabkit-dev-service-account.json')
    ),
    databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
  });

  const apps = await (await admin.database().ref('apps').get()).val();
  for (const appId in apps) {
    console.log(appId);
    await admin.database().ref(`apps/${appId}/defaultNotificationPreference`).set('allWorkspace');
  }

  process.exit(0);
}

run();
