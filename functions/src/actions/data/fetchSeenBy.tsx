import * as admin from 'firebase-admin';
import { isValidSeenBy } from '../helpers/isValidSeenBy';

export async function fetchSeenBy(props: { appId: string; workspaceId: string; threadId: string }) {
  const db = admin.database();
  const seenBy = await (
    await db.ref(`/views/seenBy/${props.appId}/${props.workspaceId}/${props.threadId}/`).get()
  ).val();

  if (!isValidSeenBy(seenBy)) {
    console.debug('invalid seenBy, exiting', seenBy);
    throw new Error('invalid seenBy');
  }

  return seenBy;
}
