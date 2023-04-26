import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import admin from 'firebase-admin';
import { ref } from './actions/data/refs';

export async function commentImpl(request: functions.https.Request, response: functions.Response) {
  const transaction = Sentry.startTransaction({ name: 'comment' });
  const { apiKey, appId, userId, workspaceId, threadId, body } = request.body;
  try {
    if (!apiKey || typeof apiKey !== 'string') {
      console.debug('"apiKey" not provided', apiKey);
      response.status(400).send({ status: 400, error: '"apiKey" not provided' });
      return;
    }

    if (!appId || typeof appId !== 'string') {
      console.debug('"appId" not provided', appId);
      response.status(400).send({ status: 400, error: '"appId" not provided' });
      return;
    }

    let snapshot = await ref`/apps/${appId}/keys/${apiKey}/`.once('value');

    if (!snapshot.exists()) {
      console.debug('"apiKey" is invalid', apiKey);
      response.status(400).send({ status: 400, error: '"apiKey" is invalid' });
      return;
    }

    snapshot = await ref`/profiles/${appId}/${userId}`.get();

    if (!snapshot.exists()) {
      console.debug('"userId" is invalid', userId);
      response.status(400).send({ status: 400, error: '"userId" is invalid' });
      return;
    }

    if (!workspaceId || typeof workspaceId !== 'string') {
      console.debug('"workspaceId" not provided', workspaceId);
      response.status(400).send({ status: 400, error: '"workspaceId" not provided' });
      return;
    }

    let isUserInWorkspace =
      (await (await ref`/workspaces/${appId}/${workspaceId}/profiles/${userId}/`.get()).val()) ==
      true;

    if (!isUserInWorkspace) {
      console.debug('"userId" is not in workspace', userId);
      response.status(400).send({ status: 400, error: '"userId" is not in workspace' });
      return;
    }

    if (!threadId || typeof threadId !== 'string') {
      console.debug('"threadId" not provided', threadId);
      response.status(400).send({ status: 400, error: '"threadId" not provided' });
      return;
    }

    if (!body) {
      console.debug('message "body" not provided', body);
      response.status(400).send({ status: 400, error: 'message "body" not provided' });
      return;
    }

    if (typeof body !== 'string') {
      console.debug('message "body" is not a string', body);
      response.status(400).send({ status: 400, error: 'message "body" is not a string' });
      return;
    }

    const dbRef = ref`/timeline/${appId}/${workspaceId}/${threadId}`;
    const eventRef = await dbRef.push();

    if (!eventRef.key) {
      throw new Error('failed to gen push ref to timeline');
    }

    let data: { [key: string]: any } = {
      [ref.path`/timeline/${appId}/${workspaceId}/${threadId}/${eventRef.key}`]: {
        body: body,
        type: 'message',
        createdById: userId,
        createdAt: admin.database.ServerValue.TIMESTAMP,
        mentions: null, // TODO : handle mentions
      },
      [ref.path`/views/inbox/${appId}/${workspaceId}/${threadId}`]: {
        body: body,
        type: 'message',
        createdById: userId,
        createdAt: admin.database.ServerValue.TIMESTAMP,
        mentions: null, // TODO : handle mentions
        id: eventRef.key,
        name: threadId,
      },
      [ref.path`/views/threadProfiles/${appId}/${workspaceId}/${threadId}/${userId}`]: true,
    };

    try {
      await ref`/`.update(data);
    } catch (e: any) {
      const error = new Error('failed to write msg: ' + e.message);
      error.stack += e.stack;
      throw error;
    }

    // returns message Id
    response.status(200).send(eventRef.key);
  } catch (e) {
    Sentry.captureException(e, { tags: { appId, workspaceId } });
    response.status(500).send({ status: 500, error: 'Internal Server Error' });
  } finally {
    transaction.finish();
  }
}

export const comment = functions
  .runWith({ minInstances: 1 })
  .https.onRequest(async (request, response) => {
    commentImpl(request, response);
  });
