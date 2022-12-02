import * as admin from 'firebase-admin';
import { isValidApp } from '../helpers/isValidApp';
import { ref } from './refs';

export async function fetchApp(props: { appId: string }) {
  const appSnapshot = await ref`/apps/${props.appId}`.get();
  const app = appSnapshot.val();
  if (!isValidApp(app)) {
    console.debug('invalid app, exiting', app);
    throw new Error('invalid app');
  }
  return { app };
}
