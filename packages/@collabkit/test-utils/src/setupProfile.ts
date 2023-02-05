import admin from 'firebase-admin';

export async function setupProfile({ appId, userId }: { appId: string; userId: string }) {
  await admin.database().ref('profiles').child(appId).child(userId).set({
    name: 'Test User',
    email: 'test@example.com',
  });
}
