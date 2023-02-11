import admin from 'firebase-admin';
import path from 'path';
import os from 'os';

export function deleteUndefinedProps(o: any) {
  if (o != null && typeof o === 'object') {
    Object.keys(o).forEach((key) => {
      if (o[key] === undefined) {
        delete o[key];
      }
    });
  }
  return o;
}

async function run() {
  admin.initializeApp({
    credential: admin.credential.cert(
      path.join(os.homedir(), '/Users/nc/collabkit-dev-firebase.json')
    ),
    databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
  });

  const apps = await (await admin.database().ref('apps').get()).val();

  for (const appId in apps) {
    const workspaces = await (await admin.database().ref(`workspaces/${appId}/`).get()).val();
    const profiles = await (await admin.database().ref(`profiles/${appId}/`).get()).val();
    for (const workspaceId in workspaces) {
      const timeline = await (
        await admin.database().ref(`timeline/${appId}/${workspaceId}`).get()
      ).val();
      for (const threadId in timeline) {
        const threadProfiles = (
          await admin
            .database()
            .ref(`views/threadProfiles/${appId}/${workspaceId}/${threadId}`)
            .get()
        ).val();

        for (const profileId in threadProfiles) {
          // console.log('profileId', profileId, profiles[profileId]);
          console.log('.');
          if (!profiles[profileId]) {
            console.log('Missing profile', appId, workspaceId, profileId);
            continue;
          }
          try {
            await admin
              .database()
              .ref(`views/workspaceProfiles/${appId}/${workspaceId}/${profileId}`)
              .set(deleteUndefinedProps(profiles[profileId]));
          } catch (e) {
            console.log('Error', appId, workspaceId, profileId, profiles[profileId]);
            console.error(e);
            process.exit(1);
          }
        }
      }
    }
  }

  process.exit(0);
}

run();
