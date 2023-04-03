import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage } from 'firebase/storage';

export default function setupFirebase(): { app: FirebaseApp; storage: FirebaseStorage } {
  const apps = getApps();
  if (apps.length) {
    return { app: apps[0], storage: getStorage(apps[0]) };
  }
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_TEAMSPACE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_TEAMSPACE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_TEAMSPACE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_TEAMSPACE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_TEAMSPACE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_TEAMSPACE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_TEAMSPACE_FIREBASE_APP_ID,
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  return { app, storage };
}
