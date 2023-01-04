import * as admin from 'firebase-admin';
if (admin.apps.length === 0) {
  admin.initializeApp();
}

import { createApp } from './createApp';
import { createOrg } from './createOrg';
import { generateToken } from './generateToken';
import { onEvent } from './onEvent';
import { sendNotification } from './sendNotification';
import { triggerWebhook } from './triggerWebhook';
import { comment } from './comment';

export { createOrg, createApp, generateToken, onEvent, sendNotification, triggerWebhook, comment };
