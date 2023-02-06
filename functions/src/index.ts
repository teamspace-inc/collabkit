import admin from 'firebase-admin';
if (admin.apps.length === 0) {
  admin.initializeApp();
}

import { routes } from './routes';
import { createOrg } from './createOrg';
import { generateToken } from './generateToken';
import { onEvent } from './onEvent';
import { sendNotification } from './sendNotification';
import { triggerWebhook } from './triggerWebhook';
import { comment } from './comment';
import { createUser } from './createUser';
import { createWorkspace } from './createWorkspace';
import { generateCustomToken } from './generateCustomToken';

export {
  createOrg,
  routes as v1,
  generateToken,
  onEvent,
  sendNotification,
  triggerWebhook,
  comment,
  createUser,
  createWorkspace,
  generateCustomToken,
};
