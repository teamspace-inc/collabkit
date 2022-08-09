import * as admin from 'firebase-admin';

admin.initializeApp();

import { createApp } from './createApp';
import { generateToken } from './generateToken';
import { sendNotification } from './sendNotification';
export { createApp, generateToken, sendNotification };
