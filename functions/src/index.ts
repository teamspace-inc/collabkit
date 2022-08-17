import * as admin from 'firebase-admin';
if (admin.apps.length === 0) {
  admin.initializeApp();
}

import { createApp } from './createApp';
import { createOrg } from './createOrg';
import { generateToken } from './generateToken';
import { onEvent } from './onEvent';
import { sendNotification } from './sendNotification';

export { createOrg, createApp, generateToken, onEvent, sendNotification };
