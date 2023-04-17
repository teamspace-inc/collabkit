import readline from 'readline';
import admin from 'firebase-admin';
import path from 'path';
import os from 'os';

// One-off script to unlink users from some workspaces in the Latitude app.

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

  const answer2 = await ask(`Unlinking users from some workspaces in this app, continue? (y/n) `);

  if (answer2 !== 'y') {
    console.log('Aborting');
    process.exit(0);
  }

  //   DELETE USER WITH ID = "user-4" FROM THESE WORKSPACES:
  // - "52"
  // - "215"
  // - "223"
  // - "229"
  await admin.database().ref(`/workspaces/${appId}/52/profiles/user-4`).remove();
  await admin.database().ref(`/workspaces/${appId}/215/profiles/user-4`).remove();
  await admin.database().ref(`/workspaces/${appId}/223/profiles/user-4`).remove();
  await admin.database().ref(`/workspaces/${appId}/229/profiles/user-4`).remove();

  // DELETE USER WITH ID = "user-774" FROM THESE WORKSPACES:
  // - "52"
  // - "61"
  // - "215"
  // - "229"
  // - "3525"
  // - "4268"
  await admin.database().ref(`/workspaces/${appId}/52/profiles/user-774`).remove();
  await admin.database().ref(`/workspaces/${appId}/61/profiles/user-774`).remove();
  await admin.database().ref(`/workspaces/${appId}/215/profiles/user-774`).remove();
  await admin.database().ref(`/workspaces/${appId}/229/profiles/user-774`).remove();
  await admin.database().ref(`/workspaces/${appId}/3525/profiles/user-774`).remove();
  await admin.database().ref(`/workspaces/${appId}/4268/profiles/user-774`).remove();

  // DELETE USER WITH ID = "user-5" FROM THESE WORKSPACES:
  // - "52"
  // - "215"
  // - "223"
  // - "229"
  // - "5"
  // - "22"
  await admin.database().ref(`/workspaces/${appId}/52/profiles/user-5`).remove();
  await admin.database().ref(`/workspaces/${appId}/215/profiles/user-5`).remove();
  await admin.database().ref(`/workspaces/${appId}/223/profiles/user-5`).remove();
  await admin.database().ref(`/workspaces/${appId}/229/profiles/user-5`).remove();
  await admin.database().ref(`/workspaces/${appId}/5/profiles/user-5`).remove();
  await admin.database().ref(`/workspaces/${appId}/22/profiles/user-5`).remove();

  // DELETE USER WITH ID = "user-57" FROM THESE WORKSPACES:
  // - "52"
  // - "61"
  // - "187"
  // - "229"
  // - "23"
  await admin.database().ref(`/workspaces/${appId}/52/profiles/user-57`).remove();
  await admin.database().ref(`/workspaces/${appId}/61/profiles/user-57`).remove();
  await admin.database().ref(`/workspaces/${appId}/187/profiles/user-57`).remove();
  await admin.database().ref(`/workspaces/${appId}/229/profiles/user-57`).remove();
  await admin.database().ref(`/workspaces/${appId}/23/profiles/user-57`).remove();

  // DELETE USER WITH ID = "user-7" FROM THESE WORKSPACES:
  // - "218"
  await admin.database().ref(`/workspaces/${appId}/218/profiles/user-7`).remove();

  // DELETE USER WITH ID = "user-1204" FROM THESE WORKSPACES:
  // - "729"
  await admin.database().ref(`/workspaces/${appId}/729/profiles/user-1204`).remove();

  // DELETE USER WITH ID = "user-61" FROM THESE WORKSPACES:
  // - "3525"
  await admin.database().ref(`/workspaces/${appId}/3525/profiles/user-61`).remove();

  // DELETE USER WITH ID = "user-1" FROM THESE WORKSPACES:
  // - "52"
  // - "223"
  // - "229"
  // - "23"
  await admin.database().ref(`/workspaces/${appId}/52/profiles/user-1`).remove();
  await admin.database().ref(`/workspaces/${appId}/223/profiles/user-1`).remove();
  await admin.database().ref(`/workspaces/${appId}/229/profiles/user-1`).remove();
  await admin.database().ref(`/workspaces/${appId}/23/profiles/user-1`).remove();

  // DELETE USER WITH ID = "user-278" FROM THESE WORKSPACES:
  // - "375"
  await admin.database().ref(`/workspaces/${appId}/375/profiles/user-278`).remove();

  // DELETE USER WITH ID = "user-78" FROM THESE WORKSPACES:
  // - "358"
  // - "359"
  await admin.database().ref(`/workspaces/${appId}/358/profiles/user-78`).remove();
  await admin.database().ref(`/workspaces/${appId}/359/profiles/user-78`).remove();

  // DELETE USER WITH ID = "user-1032" FROM THESE WORKSPACES:
  // - "972"
  await admin.database().ref(`/workspaces/${appId}/972/profiles/user-1032`).remove();
  await admin.database().ref(`/workspaces/${appId}/972/profiles/user-1032`).remove();

  // DELETE USER WITH ID = "user-1136" FROM THESE WORKSPACES:
  // - "729"
  await admin.database().ref(`/workspaces/${appId}/729/profiles/user-1136`).remove();

  process.exit(0);
}

run()
  .then(() => console.log('Done'))
  .catch((e) => console.error(e));
