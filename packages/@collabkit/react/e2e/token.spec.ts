import { test, expect, BrowserContext, Page } from '@playwright/test';
import jwt from 'jsonwebtoken';

import { signInWithUserToken, createUserToken } from './setup.ts'

import {} from '@collabkit/node';
import jwt_decode from 'jwt-decode';

const HOST = process.env.PREVIEW_URL_DEMO ? process.env.PREVIEW_URL_DEMO : 'http://localhost:3000';
const USER_ID = 'meetcshah19';
const API_KEY = 'dHchccA9yszQ3EFftTEQm';
const WORKSPACE_ID = 'collabkit';
const APP_ID = '0mO-P6YhtUwKsZNwnDSt9';

test.describe('secure token mechanism', () => {
  test('create user token', async ({ context }) => {
    const token = createUserToken({ apiKey: API_KEY, userId: USER_ID, workspaceId: WORKSPACE_ID });
    let decodedUserToken : any = jwt.verify(token, API_KEY);
    expect(decodedUserToken.userId).toBe(USER_ID);
    expect(decodedUserToken.workspaceId).toBe(WORKSPACE_ID);
  });

  test('e2e', async ({ context }) => {
    const token = createUserToken({ apiKey: API_KEY, userId: USER_ID, workspaceId: WORKSPACE_ID });
    const userToken = await signInWithUserToken(APP_ID, token);
    let decoded: any = jwt_decode(userToken);
    expect(decoded.claims).toStrictEqual({
      api: true,
      mode: 'SECURED',
      appId: APP_ID,
      userId: USER_ID,
      workspaceId: WORKSPACE_ID,
    });
  });
});
