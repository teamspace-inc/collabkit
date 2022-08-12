import * as functions from 'firebase-functions';
import { v2 } from '@google-cloud/tasks';

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
      },
      scheduleTime: {
        // 5 minutes from now
        seconds: Math.floor((Date.now() + 5 * 60 * 1000) / 1000),
      },
    } as const;

    return (async () => {
      try {
        // Send create task request.
        const [response] = await client.createTask({ parent, task });
        console.log(
          `schedule: ${appId} ${workspaceId} ${threadId} ${eventId} ${snapshot.val().body}`
        );
        return response.name;
      } catch (error: any) {
        // Construct error for Stackdriver Error Reporting
        console.error(Error(error.message));
        return;
      }
    })();
  });
