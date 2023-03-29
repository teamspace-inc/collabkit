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
import { generateCustomToken } from './generateCustomToken';
import { issueTracker } from './issueTracker';

export {
  createOrg,
  routes as v1,
  generateToken,
  onEvent,
  sendNotification,
  triggerWebhook,
  comment,
  generateCustomToken,
  issueTracker
};
