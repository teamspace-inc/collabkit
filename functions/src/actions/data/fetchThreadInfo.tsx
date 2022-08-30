import * as admin from 'firebase-admin';
import { isValidThreadInfo } from '../helpers/isValidThreadInfo';

export async function fetchThreadInfo(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
}) {
  const { appId, workspaceId, threadId } = props;
  const db = admin.database();
  const threadInfo = await (
    await db.ref(`/threadInfo/${appId}/${workspaceId}/${threadId}`).get()
  ).val();

  if (!isValidThreadInfo(threadInfo)) {
    console.debug('invalid thread info, exiting', threadInfo);
    throw new Error('invalid thread info');
  }

  if (!threadInfo.url) {
    console.debug('no thread url, skipping', threadInfo);
    throw new Error('no thread url');
  }

  return {
    threadInfo,
  };
}
