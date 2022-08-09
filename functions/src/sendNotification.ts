import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

// on a new event, writes to the notification log
// the notification log is periodically processed and notifies other users

// import * as mailgun from 'mailgun-js';
// const DOMAIN = 'mail.collabkit.dev';
// const mg = mailgun({
//   apiKey: 'add529c2a5dca50c702baf11a82b8ce2-50f43e91-0898e31b',
//   domain: DOMAIN,
// });

export const sendNotification = functions.database
  .ref('/timeline/{appId}/{workspaceId}/{threadId}/{eventId}')
  .onCreate((snapshot, context) => {
    if (context.authType === 'ADMIN') {
      return;
    }

    // const event = snapshot.val();
    // const { appId, workspaceId, threadId, eventId } = context.params;

    // const data = {
    //   from: 'Excited User <me@samples.mailgun.org>',
    //   to: 'namit@collabkit.dev',
    //   subject: 'Hello',
    //   text: 'Testing some Mailgun awesomness!',
    // };

    // mg.messages().send(data, function (_error, body) {
    //   console.log(body);
    // });
  });

// X left a comment for Y on Z
