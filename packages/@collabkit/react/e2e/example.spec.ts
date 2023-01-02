import { test, expect } from '@playwright/test';
import { setupApp, setupFirebase } from '../../test-utils/src';
import { nanoid } from 'nanoid';

test('homepage has title and links to intro page', async ({ page }) => {
  const appId = nanoid();
  const apiKey = nanoid();
  setupFirebase();
  setupApp({ appId, apiKey });

  const params = new URLSearchParams({
    test: 'true',
    userName: 'John',
    userId: '123',
    appId,
    apiKey,
  });

  await page.goto('https://internal.demo.collabkit.dev/?' + params.toString());

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  const getStarted = page.getByRole('link', { name: 'Get started' });

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // Click the get started link.
  await getStarted.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
