import admin from 'firebase-admin';

export function setupWorkspaceProfile({
  appId,
  workspaceId,
  userId,
}: {
  appId: string;
  userId: string;
  workspaceId: string;
}) {
  return admin
    .database()
    .ref('workspaces')
    .child(appId)
    .child(workspaceId)
    .child('profiles')
    .child(userId)
    .set(true);
}
