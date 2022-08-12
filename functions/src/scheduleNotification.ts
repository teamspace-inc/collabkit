import * as functions from 'firebase-functions';
// import { generateNotification } from './generateNotification';
// import * as admin from 'firebase-admin';
import { v2 } from '@google-cloud/tasks';
// on a new event, writes to the notification log
// the notification log is periodically processed and notifies other users

// import * as mailgun from 'mailgun-js';
// const DOMAIN = 'mail.collabkit.dev';
// const mg = mailgun({
//   apiKey: 'add529c2a5dca50c702baf11a82b8ce2-50f43e91-0898e31b',
//   domain: DOMAIN,
// });

// .default workspace = single tenant

export const scheduleNotification = functions.database
  .ref('/timeline/{appId}/{workspaceId}/{threadId}/{eventId}')
  .onCreate((snapshot, context) => {
    if (context.authType === 'ADMIN') {
      return;
    }

    const { appId, workspaceId, threadId, eventId } = context.params;

    const projectId = process.env.GCLOUD_PROJECT;

    if (!projectId) {
      throw new Error('GCLOUD_PROJECT environment variable is not set');
      return;
    }

    const client = new v2.CloudTasksClient();
    const parent = client.queuePath(projectId, 'us-central1', 'notifs');

    const body = Buffer.from(
      JSON.stringify({ appId, workspaceId, threadId, eventId, event: snapshot.val() })
    ).toString('base64');

    const url = 'https://us-central1-collabkit-dev.cloudfunctions.net/sendNotification';

    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        oidcToken: {
          serviceAccountEmail: 'firebase-adminsdk-uvz5y@collabkit-dev.iam.gserviceaccount.com',
          audience: new URL(url).origin,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        body,
        scheduleTime: {
          seconds: Math.floor((Date.now() + 5 * 60 * 1000) / 1000),
        },
      },
    } as const;

    return (async () => {
      try {
        // Send create task request.
        const [response] = await client.createTask({ parent, task });
        console.log(`Created task ${response.name}`);
        return response.name;
      } catch (error: any) {
        // Construct error for Stackdriver Error Reporting
        console.error(Error(error.message));
        return;
      }
    })();

    // generateNotification({ appId, workspaceId, threadId, eventId }, snapshot.val()).then(
    //   (notification) => {
    //     console.log('notification', notification);
    //   }
    // );

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
