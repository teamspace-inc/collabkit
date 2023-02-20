import { test, expect, BrowserContext, Page } from '@playwright/test';

// @ts-expect-error
import { setupApp, setupFirebase } from './setup.ts';

import { nanoid } from 'nanoid';

const HOST = process.env.PREVIEW_URL_DEMO ? process.env.PREVIEW_URL_DEMO : 'http://localhost:3000';

const LADLE_HOST = process.env.PREVIEW_URL_LADLE
  ? process.env.PREVIEW_URL_LADLE
  : 'http://localhost:61000';
setupFirebase();

async function visitDashboardAsUser(
  context: BrowserContext,
  props: { appId: string; apiKey: string; userId: string; userName: string; userEmail: string }
) {
  const page = await context.newPage();
  const params = new URLSearchParams({
    test: 'true',
    ...props,
  });
  const url = HOST + '/dashboard?' + params.toString();
  await page.goto(url);
  return page;
}

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
  await page.goto(url, { waitUntil: 'networkidle' });
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

async function createAppAndVisitDashboardAsUser(
  context: BrowserContext,
  user: typeof users[number]
) {
  const { apiKey, appId } = await createApp();
  const page = await visitDashboardAsUser(context, {
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
  page.waitForTimeout(2000);
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

async function visitLadleURL(context: BrowserContext, URL: string, params: Record<string, string>) {
  const page = await context.newPage();
  const parameters = new URLSearchParams(params);
  const url = LADLE_HOST + URL + '?' + parameters.toString();
  await page.goto(url);
  return page;
}

async function hasComment(page: Page, comment: { body: string }, nth: number = 0) {
  const markdown = await page.getByTestId('collabkit-markdown').nth(nth);
  const text = await markdown.innerText();
  await expect(text).toStrictEqual(comment.body);
}

async function hoverComment(page: Page, comment: { body: string }, nth: number = 0) {
  await page.getByText(comment.body).nth(nth).hover();
}

async function doesNotHaveComment(page: Page, comment: { body: string }) {
  const markdown = await page.$(`text=${comment.body}`);
  await expect(markdown).toBeNull();
}

async function clickMentionButton(page: Page) {
  await focusComposer(page);
  await page.waitForTimeout(500);
  await page.click('[data-testid="collabkit-composer-mentions-button"]');
}

async function focusComposer(page: Page, nth: number = 0) {
  const composer = await page.getByTestId('collabkit-composer-contenteditable').nth(nth);
  await composer.click();
  await page.waitForTimeout(500);
  return composer;
}

async function typeInComposer(page: Page, text: string, nth: number = 0) {
  const composer = await focusComposer(page, nth);
  await composer.type(text);
}

async function typeAtSymbol(page: Page) {
  const composer = await focusComposer(page);
  await composer.type('@');
}

async function hasMentionInTypeahead(page: Page, name: string, nth: number = 0) {
  const text = await page
    .getByTestId('collabkit-mentions-typeahead-item-name')
    .nth(nth)
    .innerText();
  await expect(text).toBe(name);
}

async function hasMentionInComposer(page: Page, name: string, nth: number = 0) {
  await page.waitForSelector('.collabkit-mention-node');
  expect(await page.locator('.collabkit-mention-node').nth(nth).innerText()).toBe('@' + name);
}

async function clickCommentMenuButton(page: Page, nth: number = 0) {
  await page.getByTestId('collabkit-comment-menu').nth(nth).click();
}

async function clickCommentMenuDeleteButton(page: Page) {
  await page.getByTestId('collabkit-comment-menu-delete-button').click();
}

async function clickCommentMenuEditButton(page: Page) {
  await page.getByTestId('collabkit-comment-menu-edit-button').click();
}

async function focusCommentComposer(page: Page, nth: number = 0) {
  await page
    .getByTestId('collabkit-comment-composer-root')
    .nth(nth)
    .locator('[contenteditable=true]')
    .click();
}

async function typeInCommentComposer(page: Page, text: string, nth: number = 0) {
  await focusCommentComposer(page, nth);
  await page.keyboard.type(text);
}

async function saveEditedComment(page: Page, nth: number = 0) {
  await page.getByTestId('collabkit-comment-save-button').nth(nth).click();
}

async function assertOnePinMarker(page: Page) {
  expect(await page.getByTestId('collabkit-pin-marker').count()).toBe(1);
}

async function assertNoPinMarker(page: Page) {
  expect(await page.getByTestId('collabkit-pin-marker').count()).toBe(0);
}

async function assertNoCommentPin(page: Page) {
  expect(await page.getByTestId('collabkit-comment-pin').count()).toBe(0);
}

async function assertOneCommentPin(page: Page) {
  expect(await page.getByTestId('collabkit-comment-pin').count()).toBe(1);
}

test.describe('Dashboard', () => {
  test('renders page title', async ({ context }) => {
    const { page } = await createAppAndVisitDashboardAsUser(context, alice);
    await expect(page).toHaveTitle(/Vite App/);
  });

  test('can pin chart', async ({ context }) => {
    const { page } = await createAppAndVisitDashboardAsUser(context, alice);
    await page.waitForSelector('[data-testid="collabkit-sidebar-inbox-button"]');
    await page.getByTestId('collabkit-sidebar-inbox-button').click();
    await page.waitForSelector('[data-testid="collabkit-composer-pin-button"]');
    await page.getByTestId('collabkit-composer-pin-button').click();
    const svgPathRect = await page.locator('svg.recharts-surface').boundingBox();
    if (!svgPathRect) throw new Error('Chart path not found');
    await page.mouse.move(0, 0);
    await page.mouse.move(
      svgPathRect.x + svgPathRect.width / 2,
      svgPathRect.y + svgPathRect.height / 2
    );
    await assertOnePinMarker(page);

    await page.mouse.down();
    await page.mouse.up();

    await assertOnePinMarker(page);

    const pinMarker = await page.getByTestId('collabkit-pin-marker');
    const pinMarkerRect = await pinMarker.boundingBox();
    if (!pinMarkerRect) throw new Error('Pin marker not found');
    const pinMarkerY = Math.round(pinMarkerRect.y + pinMarkerRect.height);
    const pinMarkerX = Math.round(pinMarkerRect.x + pinMarkerRect.width / 2);
    await expect(pinMarkerY).toEqual(Math.round(svgPathRect.y + svgPathRect.height / 2));
    await expect(pinMarkerX).toEqual(Math.round(svgPathRect.x + svgPathRect.width / 2));

    await assertNoCommentPin(page);

    await typeInComposer(page, 'This is a pinned comment', 1);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await hasComment(page, { body: 'This is a pinned comment' });

    await assertOnePinMarker(page);
    await assertOneCommentPin(page);

    // deletion
    await clickCommentMenuButton(page);
    await clickCommentMenuDeleteButton(page);
    await page.waitForTimeout(500);
    await assertNoCommentPin(page);
    await assertNoPinMarker(page);
  });
});

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
    await page.waitForSelector('[data-testid="collabkit-composer-placeholder"]');
    await expect(page).toHaveTitle(/CollabKit Demo/);
    const placeholder = await page.getByTestId('collabkit-composer-placeholder');
    const text = await placeholder.innerText();
    await expect(typeof text).toBe('string');
  });

  test('can comment', async ({ context }) => {
    const { page } = await createAppAndVisitThreadAsUser(context, alice);

    await sendComment(page, 'Hello World');
    await hasComment(page, { body: 'Hello World' });
  });

  // test('can comment and another user sees it', async ({ context }) => {
  //   const { page, appId, apiKey } = await createAppAndVisitThreadAsUser(context, alice);
  //   const page2 = await visitThreadAsUser(context, { ...bob, appId, apiKey });
  //   await sendComment(page, 'Hello World');
  //   await sendComment(page, 'Hello World 1');
  //   await page.waitForTimeout(2000);
  //   await hasComment(page, { body: 'Hello World' });
  //   await hasComment(page, { body: 'Hello World 1' }, 1);
  //   await hasComment(page2, { body: 'Hello World' });
  //   await hasComment(page2, { body: 'Hello World 1' }, 1);
  // });

  test('can comment and edit a comment', async ({ context }) => {
    const { page, appId, apiKey } = await createAppAndVisitThreadAsUser(context, alice);
    const page2 = await visitThreadAsUser(context, { ...bob, appId, apiKey });
    await sendComment(page, 'Hello World');
    await hasComment(page, { body: 'Hello World' });
    await hoverComment(page, { body: 'Hello World' });
    await clickCommentMenuButton(page);
    await clickCommentMenuEditButton(page);
    await focusCommentComposer(page);
    await typeInCommentComposer(page, ' Edited');
    await saveEditedComment(page);
    await page.waitForTimeout(500);
    await hasComment(page, { body: 'Hello World Edited' });
    await hasComment(page2, { body: 'Hello World Edited' });
  });

  test('can comment and delete a comment', async ({ context }) => {
    const { page, appId, apiKey } = await createAppAndVisitThreadAsUser(context, alice);
    const page2 = await visitThreadAsUser(context, { ...bob, appId, apiKey });
    await sendComment(page, 'Hello World');
    await hasComment(page, { body: 'Hello World' });
    await hoverComment(page, { body: 'Hello World' });
    await clickCommentMenuButton(page);
    await clickCommentMenuDeleteButton(page);
    await page.waitForTimeout(500);
    await doesNotHaveComment(page, { body: 'Hello World' });
    await doesNotHaveComment(page2, { body: 'Hello World' });
  });

  // test('while typing a comment others see typing indicator', async ({ context }) => {
  //   const { page, appId, apiKey } = await createAppAndVisitThreadAsUser(context, alice);
  //   const page2 = await visitThreadAsUser(context, { ...bob, appId, apiKey });
  //   await sendComment(page, 'Hello World');
  //   typeCommentSlowly(page, 'Hello this is a really long comment to test the typing indicator');
  //   const indicator = page2.getByTestId('collabkit-typing-indicator');
  //   await expect(indicator).toContainText('Alice is typing…');
  // });

  test('verify custom placeholder works for threads', async ({ context }) => {
    const page = await visitLadleURL(context, '/', { story: 'thread--custom-placeholder' });
    const placeholder = page.getByTestId('collabkit-composer-placeholder');
    const text = await placeholder.innerText();
    expect(text).toBe('custom placeholder here');
  });

  // test('can mention users with @', async ({ context }) => {
  //   const { page, appId, apiKey } = await createAppAndVisitThreadAsUser(context, alice);
  //   const page2 = await visitThreadAsUser(context, { ...bob, appId, apiKey });
  //   await sendComment(page2, 'Hello World');
  //   await typeAtSymbol(page);
  //   await hasMentionInTypeahead(page, 'Bob');
  //   await page.keyboard.press('Enter');
  //   await page.waitForTimeout(500);
  //   await hasMentionInComposer(page, 'Bob');
  // });

  // XXX: This test is temporarily disable because the @ mention button is hidden for now
  // test('can mention users by clicking the @ mention button', async ({ context }) => {
  //   const { page, appId, apiKey } = await createAppAndVisitThreadAsUser(context, alice);
  //   const page2 = await visitThreadAsUser(context, { ...bob, appId, apiKey });
  //   await sendComment(page2, 'Hello World');
  //   await typeInComposer(page, 'H');
  //   await clickMentionButton(page);
  //   await hasMentionInTypeahead(page, 'Bob');
  //   await page.keyboard.press('Enter');
  //   await page.waitForTimeout(500);
  //   await hasMentionInComposer(page, 'Bob');
  // });

  test('sidebar threads are rendering and working', async ({ context }) => {
    const page = await visitLadleURL(context, '/', { story: 'channels--channels' });
    const maxTimeToLoad = 5000;
    // To make sure that the page loads in constant maximum amount of time, we want the test to break if time taken is more than this
    await page.waitForTimeout(maxTimeToLoad);
    await page.click('[data-testid="collabkit-sidebar-inbox-button"]');
    const newThreadComposer = await page.getByTestId('new-thread-composer-div');
    const sidebarTitle = await page.getByTestId('collabkit-sidebar-title');
    await expect(await sidebarTitle.innerText()).toBe('Comments');
    await expect(newThreadComposer).toBeTruthy();
    const composer = await page.getByTestId('collabkit-composer-contenteditable');
    await composer.click();
    await page.waitForTimeout(100);
    const randomString = Math.random().toString(36).slice(2, 7);
    await composer.type('Hello World Testing' + randomString);
    await page.keyboard.press('Enter');
    const newThreadText = await page
      .getByTestId('collabkit-markdown')
      .filter({ hasText: 'Hello World Testing' + randomString });
    await page.waitForTimeout(100);
    await expect(newThreadText).toHaveCount(1);
  });
});
