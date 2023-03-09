import readline from 'readline';
import admin from 'firebase-admin';
import path from 'path';
import os from 'os';

function ask(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function run() {
  const appId = process.argv[2];

  if (!appId) {
    console.log('No appId provided, appId:', appId);
    process.exit(1);
  }

  if (appId.length === 0) {
    console.log('App length === 0, appId:', appId);
    process.exit(1);
  }

  console.log('Proceeding to wipe app, appId:', appId);

  const answer = await ask('Are you sure? (y/n)');

  if (answer !== 'y') {
    console.log('Aborting');
    process.exit(0);
  }

  admin.initializeApp({
    credential: admin.credential.cert(
      path.join(os.homedir(), 'collabkit-dev-service-account.json')
    ),
    databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
  });

  const app = (await admin.database().ref(`apps/${appId}`).get()).val();

  console.log(app);

  if (app === null) {
    console.log('App not found, appId:', appId);
    process.exit(1);
  }

  console.log('Found app:', app);

  const answer2 = await ask('Delete all app data? (y/n) ');

  if (answer2 !== 'y') {
    console.log('Aborting');
    process.exit(0);
  }

  try {
    await Promise.allSettled([
      admin.database().ref(`notifedUntil/${appId}`).remove(),
      admin.database().ref(`pins/${appId}`).remove(),
      admin.database().ref(`profiles/${appId}`).remove(),
      admin.database().ref(`seen/${appId}`).remove(),
      admin.database().ref(`threadInfo/${appId}`).remove(),
      admin.database().ref(`timeline/${appId}`).remove(),
      admin.database().ref(`views/inbox/${appId}`).remove(),
      admin.database().ref(`views/seenBy/${appId}`).remove(),
      admin.database().ref(`views/openThreads/${appId}`).remove(),
      admin.database().ref(`views/threadPins/${appId}`).remove(),
      admin.database().ref(`views/threadProfiles/${appId}`).remove(),
      admin.database().ref(`views/openPins/${appId}`).remove(),
      admin.database().ref(`views/isOpen/${appId}`).remove(),
      admin.database().ref(`views/isResolved/${appId}`).remove(),
      admin.database().ref(`workspaces/${appId}`).remove(),
    ]);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  process.exit(0);
}

run();
