import * as admin from 'firebase-admin';
import { isValidNotifiedUntilId } from '../helpers/isValidNotifiedUntilId';

export async function fetchNotifiedUntilId(props: {
  appId: string;
  workspaceId: string;
  profileId: string;
  threadId: string;
}) {
  const { appId, workspaceId, profileId, threadId } = props;
  const db = admin.database();
  const notifiedUntil = (
    await db.ref(`/notifiedUntil/${appId}/${workspaceId}/${threadId}/${profileId}`).get()
  ).val();

  if (!isValidNotifiedUntilId(notifiedUntil)) {
    console.debug('invalid notifiedUntil, skipping', notifiedUntil);
    throw new Error('invalid notifiedUntil');
  }

  return notifiedUntil;
}
