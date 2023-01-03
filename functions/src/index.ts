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
import { sendAPI } from './sendAPI';

export { createOrg, createApp, generateToken, onEvent, sendNotification, triggerWebhook, sendAPI };
