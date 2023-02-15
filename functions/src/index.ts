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
import { User } from './User';
import { Workspace } from './Workspace';
import { generateCustomToken } from './generateCustomToken';

export {
  createOrg,
  routes as v1,
  generateToken,
  onEvent,
  sendNotification,
  triggerWebhook,
  comment,
  User,
  Workspace,
  generateCustomToken,
};
