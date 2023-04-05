import admin from 'firebase-admin';
if (admin.apps.length === 0) {
  admin.initializeApp();
}

import { routes } from './routes';
import { generateToken } from './generateToken';
import { onEvent } from './onEvent';
import { sendNotification } from './sendNotification';
import { triggerWebhook } from './triggerWebhook';
import { generateCustomToken } from './generateCustomToken';
import { enableBot } from './enableBot';

export {
  routes as v1,
  generateToken,
  onEvent,
  sendNotification,
  triggerWebhook,
  generateCustomToken,
  enableBot,
};
