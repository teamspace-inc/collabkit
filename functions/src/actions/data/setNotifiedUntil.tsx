import * as admin from 'firebase-admin';

export function setNotifiedUntil(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  profileId: string;
  notifiedUntilId: string;
}) {
  const db = admin.database();
  return db
    .ref(`/notifiedUntil/${props.appId}/${props.workspaceId}/${props.threadId}/${props.profileId}`)
    .set(props.notifiedUntilId);
}
