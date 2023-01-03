import { test, expect, BrowserContext } from '@playwright/test';

// @ts-expect-error
import { setupApp, setupFirebase } from './setup.ts';

import { nanoid } from 'nanoid';

const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.PREVIEW_URL ?? 'https://internal.demo.collabkit.dev';

setupFirebase();

async function visitThreadAsUser(
  context: BrowserContext,
  props: { appId: string; apiKey: string; userId: string; userName: string; userEmail: string }
) {
  const page = await context.newPage();
  const params = new URLSearchParams({
    test: 'true',
    ...props,
  });
  const url = HOST + '/thread?' + params.toString();
  await page.goto(url);
  return page;
}

async function createApp() {
  const appId = nanoid();
  const apiKey = nanoid();
  await setupApp({ appId, apiKey });
  return {
    appId,
    apiKey,
  };
}

const alice = {
  userName: 'Alice',
  userId: 'alice',
  userEmail: 'alice@example.com',
};

const bob = {
  userName: 'Bob',
  userId: 'bob',
  userEmail: 'bob@example.com',
};

const users = [alice, bob];

async function createAppAndVisitThreadAsUser(context: BrowserContext, user: typeof users[number]) {
  const { apiKey, appId } = await createApp();
  const page = await visitThreadAsUser(context, {
    ...user,
    appId,
    apiKey,
  });
  return page;
}

test.describe('Thread', () => {
  test('renders page title', async ({ context }) => {
    const page = await createAppAndVisitThreadAsUser(context, alice);
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/CollabKit Demo/);
  });

  test('renders thread header', async ({ context }) => {
    const page = await createAppAndVisitThreadAsUser(context, alice);

    const threadHeader = await page.getByText('Comments');

    const threadHeaderText = await threadHeader.innerText();

    await expect(threadHeaderText).toStrictEqual('Comments');
  });

  test('renders thread composer', async ({ context }) => {
    const page = await createAppAndVisitThreadAsUser(context, alice);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/CollabKit Demo/);

    const placeholder = await page.getByTestId('collabkit-composer-placeholder');

    const text = await placeholder.innerText();

    await expect(text).toStrictEqual('Write a comment');
  });

  test('can comment', async ({ context }) => {
    const page = await createAppAndVisitThreadAsUser(context, alice);

    const composer = await page.locator(
      '[data-testid="collabkit-composer-contenteditable"] [contenteditable=true]'
    );

    await composer.click();

    await composer.fill('Hello World');

    await page.keyboard.press('Enter');

    const comment = await page.getByTestId('collabkit-comment-body');

    const text = await comment.innerText();

    await expect(text).toStrictEqual('Hello World');
  });
});
