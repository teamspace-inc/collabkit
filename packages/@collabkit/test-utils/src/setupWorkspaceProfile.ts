import admin from 'firebase-admin';

export async function setupWorkspaceProfile({
  appId,
  workspaceId,
  userId,
}: {
  appId: string;
  userId: string;
  workspaceId: string;
}) {
  await admin
    .database()
    .ref('workspaces')
    .child(appId)
    .child(workspaceId)
    .child('profiles')
    .child(userId)
    .set(true);
}
