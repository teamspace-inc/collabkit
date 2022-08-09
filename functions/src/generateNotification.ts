import * as admin from 'firebase-admin';

const serviceAccount = require('/Users/namitchadha/collabkit-dev-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = admin.database();

const CONNECTION_TIMEOUT_MS = 2000;

export function onConnect() {
  return new Promise((resolve, reject) => {
    let timeoutID = setTimeout(() => {
      reject('timed out');
    }, CONNECTION_TIMEOUT_MS);
    db.ref('.info/connected').on('value', (snapshot) => {
      if (snapshot.val()) {
        clearTimeout(timeoutID);
        resolve(true);
      }
    });
  });
}

export async function generateNotification(
  props: {
    appId: string;
    workspaceId: string;
    threadId: string;
    eventId: string;
  },
  event?: any
) {
  const { appId, workspaceId, threadId, eventId } = props;

  const isEmailDisabledQuery = db.ref(`/apps/${appId}/isEmailDisabled/`).get();

  const workspaceQuery = db.ref(`/workspaces/${appId}/${workspaceId}/`).get();

  const seenByQuery = db.ref(`/views/seenBy/${appId}/${workspaceId}/${threadId}/`).get();

  const notifiedQuery = db.ref(`/notified/${appId}/${workspaceId}/${threadId}/${eventId}`).get();

  const eventsQuery = db.ref(`/timeline/${appId}/${workspaceId}/${threadId}`).orderByKey().get();

  try {
    const isConnected = await onConnect();
    if (isConnected) {
      try {
        const [
          isEmailDisabledSnapshot,
          workspaceSnapshot,
          seenBySnapshot,
          eventsSnapshot,
          notifiedSnapshot,
        ] = await Promise.all([
          isEmailDisabledQuery,
          workspaceQuery,
          seenByQuery,
          eventsQuery,
          notifiedQuery,
        ]);

        if (isEmailDisabledSnapshot.val()) {
          console.log('app has email disabled, exiting');
          return;
        }

        const workspace = workspaceSnapshot.val();
        if (!workspace) {
          console.log('could not find workspace, exiting');
          return;
        }

        if (!workspace.profiles) {
          console.log('workspace has no profiles, exiting');
          return;
        }

        const profileIds = Object.keys(workspace.profiles);

        if (profileIds.length === 0) {
          console.log('workspace has no profiles, exiting');
          return;
        }

        if (profileIds.length === 1) {
          console.log('workspace has only one profile, exiting');
          return;
        }

        try {
          const profileSnapshots = await Promise.all(
            profileIds.map((profileId) => db.ref(`/profiles/${appId}/${profileId}/`).get())
          );

          const profiles: { [id: string]: any } = {};
          for (const profileId of profileIds) {
            const profileSnapshot = profileSnapshots.find((snapshot) => snapshot.key === profileId);
            if (profileSnapshot) {
              profiles[profileId] = profileSnapshot.val();
            }
          }

          console.log('got profiles', profiles);

          const seenBy = seenBySnapshot.val();
          if (!seenBy) {
            // it should at least be seenBy the message creator
            console.log('could not find seenBy, exiting');
            return;
          }

          console.log('got seenBy', seenBy);

          const events = eventsSnapshot.val();
          console.log('got events', events);

          let _event = events[eventId];

          const actorProfile = profiles[_event.createdById];
          if (!actorProfile) {
            console.log('could not find actor profile, exiting');
            return;
          }

          console.log('got creator profile', actorProfile);

          const notified = notifiedSnapshot.val();

          const isFirstEvent = Object.keys(events)[0] === eventId;
          console.log('isFirstEvent', isFirstEvent);

          const toNotify = profileIds.filter((profileId) => {
            const profile = profiles[profileId];
            if (!profile) {
              console.log('skip: no profile', profileId);
              return false;
            }
            if (profile.id === _event.createdById) {
              console.log('skip: isCreator', profileId);
              return false;
            }
            if (seenBy[profileId] && seenBy[profileId] > eventId) {
              console.log('skip: already seen', profileId);
              return false;
            }
            if (notified && notified[profileId]) {
              console.log('skip: already notified', profileId);
              return false;
            }
            return true;
          });

          const actorName = actorProfile.name ?? actorProfile.email;
          const workspaceName = workspace.name;

          console.log('to:', toNotify);
          console.log('from:', actorName);

          let subject = '';
          let body = '';

          if (isFirstEvent) {
            subject = `${actorName} left a new comment in ${workspaceName}`;
            body = `${actorName} has started a new thread in ${workspaceName} [View/Reply] [Unsubscribe]`;
          } else {
            subject = `${actorName} replied to a comment in ${workspaceName}`;
            body = `${actorName}: "${_event.body}" [View/Reply] [Unsubscribe]`;
          }

          return {
            to: toNotify,
            from: actorProfile.email,
            subject,
            body,
          };
        } catch (e) {
          console.error('error fetching profiles', e);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
  } catch (e) {
    console.error('failed to connect to firebase', e);
  }
  return;
}
generateNotification(
  {
    eventId: '-N91Wvp6YREEB44pOULI',
    threadId: 'demo-chat4',
    workspaceId: 'acme',
    appId: '-N4l4ZUeP5xdp79y7uAZ',
  },
  { createdById: '118153377351485973303' }
).then(console.log);
