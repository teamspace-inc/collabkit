import { test, expect, BrowserContext, Page } from '@playwright/test';
import { createUserToken } from '../../../@collabkit/node/src/index';
import { signInWithUserToken } from '../../../@collabkit/client/src/utils/signInWithUserToken';
import jwt_decode from 'jwt-decode';

const HOST = process.env.PREVIEW_URL_DEMO ? process.env.PREVIEW_URL_DEMO : 'http://localhost:3000';
const USER_ID = 'meetcshah19';
const API_KEY = 'dHchccA9yszQ3EFftTEQm';
const WORKSPACE_ID = 'collabkit';
const APP_ID = '0mO-P6YhtUwKsZNwnDSt9';

test.describe('secure token mechanism', () => {
  test('create user token', async ({ context }) => {
    const token = createUserToken({ apiKey: API_KEY, userId: USER_ID, workspaceId: WORKSPACE_ID });
    expect(token).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3b3Jrc3BhY2VJZCI6ImNvbGxhYmtpdCIsInVzZXJJZCI6Im1lZXRjc2hhaDE5In0.npD9lOG5_hsBUCYKXwpJDoeWsDxautsO0U8SqDBof1w'
    );
  });

  test('e2e', async ({ context }) => {
    const token = createUserToken({ apiKey: API_KEY, userId: USER_ID, workspaceId: WORKSPACE_ID });
    expect(token).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3b3Jrc3BhY2VJZCI6ImNvbGxhYmtpdCIsInVzZXJJZCI6Im1lZXRjc2hhaDE5In0.npD9lOG5_hsBUCYKXwpJDoeWsDxautsO0U8SqDBof1w'
    );
    const userToken = await signInWithUserToken(APP_ID, token);
    let decoded: any = jwt_decode(token);
    expect(decoded.claims).toBe({
      api: true,
      mode: 'SECURED',
      appId: APP_ID,
      userId: USER_ID,
      workspaceId: WORKSPACE_ID,
    });
  });
});
