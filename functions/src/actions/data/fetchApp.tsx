import * as admin from 'firebase-admin';
import { isValidApp } from '../helpers/isValidApp';

export async function fetchApp(props: { appId: string }) {
  const db = admin.database();
  const appSnapshot = await db.ref(`/apps/${props.appId}`).get();
  const app = appSnapshot.val();
  if (!isValidApp(app)) {
    console.debug('invalid app, exiting', app);
    throw new Error('invalid app');
  }
  return { app };
}
