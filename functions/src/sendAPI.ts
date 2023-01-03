import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ref } from './actions/data/refs';

export const sendAPI = functions
.runWith({ minInstances: 1 })
.https.onRequest(async (request, response) => {
  const { apiKey, appId, userId, workspaceId, threadId, message } = request.body;

  if (!appId || typeof appId !== 'string') {
    console.debug('"appId" not provided', appId);
    response.status(400).send({ status: 400, error: '"appId" not provided' });
    return;
  }

  if (!apiKey || typeof apiKey !== 'string') {
    console.debug('"apiKey" not provided', apiKey);
    response.status(400).send({ status: 400, error: '"apiKey" not provided' });
    return;
  }

  const snapshot = await ref`/apps/${appId}/keys/${apiKey}/`.once('value');

  if (!snapshot.exists()) {
    console.debug('"apiKey" not found', appId);
    response.status(400).send({ status: 400, error: '"apiKey" invalid' });
    return;
  }

  if (!workspaceId || typeof workspaceId !== 'string') {
    console.debug('"workspaceId" not provided', workspaceId);
    response
      .status(400)
      .send({ status: 400, error: '"workspaceId" not provided', workspaceId });
    return;
  }

  if (!threadId || typeof threadId !== 'string') {
    console.debug('"threadId" not provided', threadId);
    response
      .status(400)
      .send({ status: 400, error: '"threadId" not provided', threadId });
    return;
  }

  const dbRef = ref`/timeline/${appId}/${workspaceId}/${threadId}`;
  const eventRef = await dbRef.push();

  if(!eventRef.key){
    throw new Error('failed to gen push ref to timeline');
  }

  let data: { [key: string]: any } = {
    [ref.path`/timeline/${appId}/${workspaceId}/${threadId}/${eventRef.key}`]: {
      body: message,
      type: 'message',
      createdById: userId,
      createdAt: admin.database.ServerValue.TIMESTAMP,
      mentions: null, // TODO : handle mentions
    },
    [ref.path`/views/inbox/${appId}/${workspaceId}/${threadId}`]: {
      body: message,
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
});
