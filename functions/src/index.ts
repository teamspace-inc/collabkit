import * as admin from 'firebase-admin';
if (admin.apps.length === 0) {
  admin.initializeApp();
}

import { createApp } from './createApp';
import { generateToken } from './generateToken';
import { sendNotification } from './sendNotification';

export { createApp, generateToken, sendNotification };
