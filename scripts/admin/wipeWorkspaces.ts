import readline from 'readline';
import admin from 'firebase-admin';
import path from 'path';
import os from 'os';

const workspaceIds = [
  // Add workspace IDs here
];

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

  console.log(`Proceeding to wipe ${workspaceIds.length} workspace from appId:`, appId);

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

  const answer2 = await ask(`Delete ${workspaceIds.length} workspace(s)? (y/n) `);

  if (answer2 !== 'y') {
    console.log('Aborting');
    process.exit(0);
  }

  for (const workspaceId of workspaceIds) {
    try {
      const workspaceRef = admin.database().ref(`workspaces/${appId}/${workspaceId}`);
      const relatedRefs = [
        admin.database().ref(`notificationPreferences/${appId}/${workspaceId}`),
        admin.database().ref(`notifiedUntil/${appId}/${workspaceId}`),
        admin.database().ref(`pins/${appId}/${workspaceId}`),
        admin.database().ref(`threadInfo/${appId}/${workspaceId}`),
        admin.database().ref(`timeline/${appId}/${workspaceId}`),
        admin.database().ref(`views/inbox/${appId}/${workspaceId}`),
        admin.database().ref(`views/isOpen/${appId}/${workspaceId}`),
        admin.database().ref(`views/isResolved/${appId}/${workspaceId}`),
        admin.database().ref(`views/openPins/${appId}/${workspaceId}`),
        admin.database().ref(`views/seenBy/${appId}/${workspaceId}`),
        admin.database().ref(`views/threadProfiles/${appId}/${workspaceId}`),
        admin.database().ref(`views/workspaceProfiles/${appId}/${workspaceId}`),
      ];
      console.log(
        'Deleting workspace:',
        workspaceId,
        `(${workspaceIds.indexOf(workspaceId) + 1}/${workspaceIds.length})`
      );
      await Promise.all(relatedRefs.map((ref) => ref.remove()));
      await workspaceRef.remove();
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  process.exit(0);
}

run()
  .then(() => console.log('Done'))
  .catch((e) => console.error(e));
