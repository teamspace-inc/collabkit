import admin from 'firebase-admin';

export function setupProfile({ appId, userId }: { appId: string; userId: string }) {
  return admin.database().ref('profiles').child(appId).child(userId).set({
    name: 'Test User',
    email: 'test@example.com',
  });
}
