import { test, expect } from '@playwright/test';

test('adding a habit', async ({ page }) => {
  // lots of methods are async, as they need to wait for the browser
  // to respond to the user's actions, such as page visits, clicks and
  // so on.
  await page.goto('https://cat-workflow.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Brocco Meal Tracker');
});
