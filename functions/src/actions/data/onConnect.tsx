import * as admin from 'firebase-admin';

export function onConnect(timeout = 2000) {
  const db = admin.database();
  return new Promise((resolve, reject) => {
    let timeoutID = setTimeout(() => {
      reject('timed out');
    }, timeout);
    db.ref('.info/connected').on('value', (snapshot) => {
      if (snapshot.val()) {
        clearTimeout(timeoutID);
        resolve(true);
      }
    });
  });
}
