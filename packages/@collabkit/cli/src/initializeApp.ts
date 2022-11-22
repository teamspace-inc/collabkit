import os from 'os';
import path from 'path';
import admin from 'firebase-admin';

export const initializeApp = () => {
  admin.initializeApp({
    credential: admin.credential.cert(
      path.join(os.homedir(), 'collabkit-dev-service-account.json')
    ),
    databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app/',
  });
};
