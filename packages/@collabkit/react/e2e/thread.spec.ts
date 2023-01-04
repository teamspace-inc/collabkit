import { test, expect, BrowserContext, Page } from '@playwright/test';

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
  return { page, appId, apiKey };
}

async function sendComment(page: Page, body: string) {
  const composer = await page.locator(
    '[data-testid="collabkit-composer-contenteditable"] [contenteditable=true]'
  );
  await composer.click();
  await composer.fill(body);
  await page.keyboard.press('Enter');
}

async function typeCommentSlowly(page: Page, body: string) {
  const composer = await page.locator(
    '[data-testid="collabkit-composer-contenteditable"] [contenteditable=true]'
  );
  await composer.click();
  await composer.type(body, { delay: 100 });
}

test.describe('Thread', () => {
  test('renders page title', async ({ context }) => {
    const { page } = await createAppAndVisitThreadAsUser(context, alice);
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/CollabKit Demo/);
  });

  test('renders thread header', async ({ context }) => {
    const { page } = await createAppAndVisitThreadAsUser(context, alice);
    const threadHeader = await page.getByText('Comments');
    const threadHeaderText = await threadHeader.innerText();
    await expect(threadHeaderText).toStrictEqual('Comments');
  });

  test('renders thread composer', async ({ context }) => {
    const { page } = await createAppAndVisitThreadAsUser(context, alice);
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/CollabKit Demo/);
    const placeholder = await page.getByTestId('collabkit-composer-placeholder');
    const text = await placeholder.innerText();
    await expect(text).toStrictEqual('Write a comment');
  });

  test('can comment', async ({ context }) => {
    const { page } = await createAppAndVisitThreadAsUser(context, alice);

    await sendComment(page, 'Hello World');

    const comment = await page.getByTestId('collabkit-comment-body');
    const text = await comment.innerText();
    await expect(text).toStrictEqual('Hello World');
  });

  test('can comment and another user sees it', async ({ context }) => {
    const { page, appId, apiKey } = await createAppAndVisitThreadAsUser(context, alice);
    const page2 = await visitThreadAsUser(context, { ...bob, appId, apiKey });
    await sendComment(page, 'Hello World');

    const comment = await page.getByTestId('collabkit-comment-body');
    const text = await comment.innerText();
    await expect(text).toStrictEqual('Hello World');
    const comment2 = await page2.getByTestId('collabkit-comment-body');
    const text2 = await comment2.innerText();
    await expect(text2).toStrictEqual('Hello World');
  });

  test('while typing a comment others see typing indicator', async ({ context }) => {
    const { page, appId, apiKey } = await createAppAndVisitThreadAsUser(context, alice);
    const page2 = await visitThreadAsUser(context, { ...bob, appId, apiKey });
    await sendComment(page, 'Hello World');
    typeCommentSlowly(page, 'Hello this is a really long comment to test the typing indicator');
    const indicator = await page2.getByTestId('collabkit-typing-indicator');
    await expect(indicator).toContainText('Alice is typing…');
  });
});
