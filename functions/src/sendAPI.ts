import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

function encode(id: string) {
    // . is disallowed, but not escaped by encodeURIComponent, so it must be
    // handled separately.
    return encodeURIComponent(id).replace(/\./g, '%2E');
}

const path = (strings: TemplateStringsArray, ...substitutions: string[]) => {
    const path = substitutions.reduce(
      (prev, cur, i) => prev + encode(cur) + strings[i + 1],
      strings[0]
    );
    return path;
};

const ref = (strings: TemplateStringsArray, ...substitutions: string[]) => {
    return admin.database().ref(path(strings, ...substitutions));
}

export const sendAPI = functions
.runWith({ minInstances: 1 })
.https.onRequest(async (request, response) => {
  const { appId, userId, workspaceId, threadId, message } = request.body;
  const dbRef = ref`/timeline/${appId}/${workspaceId}/${threadId}`;
  const eventRef = await dbRef.push();

  if(!eventRef.key){
    throw new Error('failed to gen push ref to timeline');
  }

  let data: { [key: string]: any } = {
    [path`/timeline/${appId}/${workspaceId}/${threadId}/${eventRef.key}`]: {
      body: message,
      type: 'message',
      createdById: userId,
      createdAt: admin.database.ServerValue.TIMESTAMP,
      mentions: null, // TODO : handle mentions
    },
    [`/views/inbox/${appId}/${workspaceId}/${threadId}`]: {
      body: message,
      type: 'message',
      createdById: userId,
      createdAt: admin.database.ServerValue.TIMESTAMP,
      mentions: null, // TODO : handle mentions
      id: eventRef.key,
      name: threadId,
    },
    [`/views/threadProfiles/${appId}/${workspaceId}/${threadId}/${userId}`]: true,
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
