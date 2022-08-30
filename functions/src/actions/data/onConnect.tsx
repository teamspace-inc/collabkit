import * as admin from 'firebase-admin';

export function onConnect() {
  const db = admin.database();
  const CONNECTION_TIMEOUT_MS = 2000;
  return new Promise((resolve, reject) => {
    let timeoutID = setTimeout(() => {
      reject('timed out');
    }, CONNECTION_TIMEOUT_MS);
    db.ref('.info/connected').on('value', (snapshot) => {
      if (snapshot.val()) {
        clearTimeout(timeoutID);
        resolve(true);
      }
    });
  });
}
