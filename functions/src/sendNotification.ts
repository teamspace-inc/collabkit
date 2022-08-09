import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// on a new event, writes to the notification log
// the notification log is periodically processed and notifies other users

import * as mailgun from 'mailgun-js';
const DOMAIN = 'mail.collabkit.dev';
const mg = mailgun({
  apiKey: 'add529c2a5dca50c702baf11a82b8ce2-50f43e91-0898e31b',
  domain: DOMAIN,
});

export const sendNotification = functions.database
  .ref('/timeline/{appId}/{workspaceId}/{threadId}/{eventId}')
  .onCreate((snapshot, context) => {
    if (context.authType === 'ADMIN') {
      return;
    }

    const event = snapshot.val();
    const { appId, workspaceId, threadId, eventId } = context.params;

    const isEmailDisabled = admin.database().ref(`/apps/${appId}/isEmailDisabled/`).get();

    const creatorProfile = admin
      .database()
      .ref(`/profiles/${appId}/${workspaceId}/${event.createdById}/${eventId}/`)
      .get();
    const seenBy = admin
      .database()
      .ref(`/views/seenBy/${appId}/${workspaceId}/${threadId}/seenBy`)
      .get();
    const events = admin
      .database()
      .ref(`/timeline/${appId}/${workspaceId}/${threadId}`)
      .orderByKey()
      .startAfter(eventId)
      .get();

    Promise.all([isEmailDisabled, creatorProfile, seenBy, events])
      .then(([isEmailDisabled, creatorProfile, seenBy, events]) => {
        console.log('got data', isEmailDisabled);
        console.log('got data', creatorProfile);
        console.log('got data', seenBy);
        console.log('got data', events);
      })
      .catch((err) => {
        console.error('error retrieving data', err);
      });

    const data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: 'namit@collabkit.dev',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!',
    };

    // mg.messages().send(data, function (_error, body) {
    //   console.log(body);
    // });
  });

// X left a comment for Y on Z
