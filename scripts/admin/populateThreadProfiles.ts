import admin from 'firebase-admin';

async function run() {
  admin.initializeApp({
    credential: admin.credential.cert('/Users/nc/collabkit-dev-firebase.json'),
    databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
  });

  const apps = await (await admin.database().ref('apps').get()).val();
  await admin.database().ref('threadProfiles').set({});

  for (const appId in apps) {
    const workspaces = await (await admin.database().ref(`workspaces/${appId}/`).get()).val();
    for (const workspaceId in workspaces) {
      const timeline = await (
        await admin.database().ref(`timeline/${appId}/${workspaceId}`).get()
      ).val();
      for (const threadId in timeline) {
        let threadProfiles: { [createdById: string]: true } = {};
        for (const eventId in timeline[threadId]) {
          const event = timeline[threadId][eventId];
          threadProfiles[event.createdById] = true;
        }
        await admin
          .database()
          .ref(`views/threadProfiles/${appId}/${workspaceId}/${threadId}`)
          .set(threadProfiles);
        console.log('.');
      }
    }
  }

  process.exit(0);
}

run();
