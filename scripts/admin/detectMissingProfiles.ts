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
        for (const eventId in timeline[threadId]) {
          const createdById = timeline[threadId][eventId].createdById;
          const profile = await (
            await admin.database().ref(`profiles/${appId}/${createdById}`).get()
          ).val();
          if (!profile) {
            console.log('Missing profile', appId, createdById);
          }
        }
      }
    }
  }

  process.exit(0);
}

run();
