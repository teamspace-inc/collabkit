import { v2 } from '@google-cloud/tasks';
import { URL } from 'url';

export async function createTask(props: {
  projectId: string;
  url: string;
  queue: string;
  payload: any;
  delayMs?: number;
}) {
  const { url, payload, projectId } = props;
  const body = Buffer.from(JSON.stringify(payload)).toString('base64');

  const client = new v2.CloudTasksClient();
  const parent = client.queuePath(projectId, 'us-central1', 'notifs');

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
    ...(props.delayMs
      ? {
          scheduleTime: {
            // 5 minutes from now
            seconds: Math.floor((Date.now() + props.delayMs) / 1000),
          },
        }
      : {}),
  } as const;

  const [response] = await client.createTask({ parent, task });
  return response;
}
