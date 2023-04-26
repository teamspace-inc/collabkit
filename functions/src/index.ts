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
import { installShapeBot } from './installShapeBot';
import * as Sentry from '@sentry/node';
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export {
  routes as v1,
  generateToken,
  onEvent,
  sendNotification,
  triggerWebhook,
  generateCustomToken,
  installShapeBot,
};
