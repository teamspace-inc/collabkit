import admin from 'firebase-admin';

async function run() {
  admin.initializeApp({
    credential: admin.credential.cert('/Users/nc/collabkit-dev-firebase.json'),
    databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
  });

  const apps = await (await admin.database().ref('apps').get()).val();
  for (const appId in apps) {
    const workspaces = await (await admin.database().ref(`workspaces/${appId}/`).get()).val();
    for (const workspaceId in workspaces) {
      const timeline = await (
        await admin.database().ref(`timeline/${appId}/${workspaceId}`).get()
      ).val();
      for (const threadId in timeline) {
        let isResolved = false;
        for (const eventId in timeline[threadId]) {
          const event = timeline[threadId][eventId];
          if (event.type === 'resolve') {
            isResolved = true;
          } else if (event.type === 'delete') {
            // no-op
          } else {
            isResolved = false;
          }
        }
        await admin
          .database()
          .ref(`views/isOpen/${appId}/${workspaceId}/${threadId}`)
          .set(!isResolved);
        await admin
          .database()
          .ref(`views/isResolved/${appId}/${workspaceId}/${threadId}`)
          .set(isResolved);
        console.log('.');
      }
    }
  }

  process.exit(0);
}

run();
