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
import { createUser } from './createUser';
import { createWorkspace } from './createWorkspace';
import { userToken } from './userToken';

export { createOrg, createApp, generateToken, onEvent, sendNotification, triggerWebhook, comment, createUser, createWorkspace, userToken };
