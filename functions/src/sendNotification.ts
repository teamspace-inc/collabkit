import * as functions from 'firebase-functions';

// on a new event, writes to the notification log
// the notification log is periodically processed and notifies other users

exports.sendNotification = functions.database
  .ref('/timeline/{appId}/{workspaceId}/{roomId}/{eventId}')
  .onCreate((snapshot, context) => {
    if (context.authType === 'ADMIN') {
      return;
    }

    const event = snapshot.val();
    const { appId, workspaceId, eventId } = context.params;

    functions.database.ref(`/profiles/${appId}/${workspaceId}/${event.createdById}/${eventId}/`);
  });
