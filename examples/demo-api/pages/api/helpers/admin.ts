// Initialize firebase-admin

import * as admin from 'firebase-admin';

if (admin.apps.length === 0) {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set');
  }
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
      databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
    });
  } catch (e) {
    console.log('Error initializing firebase-admin', e);
  }
}

export { admin };
