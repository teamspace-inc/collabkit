import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(
    process.env.FirebaseTestServiceAccount ??
      '/Users/namitchadha/collabkit-test-service-account.json'
  ),
  databaseURL: 'https://collabkit-test-default-rtdb.europe-west1.firebasedatabase.app',
});
