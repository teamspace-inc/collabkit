import * as os from 'os';
import * as path from 'path';
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(
    process.env.FIREBASE_TEST_SERVICE_ACCOUNT
      ? JSON.parse(process.env.FIREBASE_TEST_SERVICE_ACCOUNT)
      : path.resolve(os.homedir(), 'collabkit-test-service-account.json')
  ),
  databaseURL: 'https://collabkit-test-default-rtdb.europe-west1.firebasedatabase.app',
});
