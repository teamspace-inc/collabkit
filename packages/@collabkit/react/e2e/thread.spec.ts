import { test, expect } from '@playwright/test';

// @ts-expect-error
import { setupApp, setupFirebase } from './setup.ts';

import { nanoid } from 'nanoid';

const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.PREVIEW_URL ?? 'https://internal.demo.collabkit.dev';

test('homepage has title and links to intro page', async ({ page }) => {
  const appId = nanoid();
  const apiKey = nanoid();
  setupFirebase();
  setupApp({ appId, apiKey });

  const params = new URLSearchParams({
    test: 'true',
    userName: 'John',
    userId: '123',
    userEmail: 'john@example.com',
    appId,
    apiKey,
  });

  const url = HOST + '/thread?' + params.toString();

  await page.goto(url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/CollabKit Demo/);

  const threadHeader = await page.getByText('Comments');

  const threadHeaderText = await threadHeader.innerText();

  await expect(threadHeaderText).toStrictEqual('Comments');
});
