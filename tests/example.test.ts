import { test, expect } from '@playwright/test';

test('Test user login and data manipulation', async ({ page }) => {
  // lots of methods are async, as they need to wait for the browser
  // to respond to the user's actions, such as page visits, clicks and
  // so on.
  await page.goto('https://cat-workflow.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Brocco Meal Tracker');
  await expect(page.getByText('Hello there, stranger.')).toBeVisible();
  await page.getByPlaceholder("What's your name?").fill('Vaidotas');
  await page.getByPlaceholder('Your weight').fill('82');
  await page.getByTestId('initial-option-test').click();
  await expect(page.getByText('37')).toBeVisible();
  await page.getByText('37').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(
    page.getByText('Base Goal - Food + Exercise = 2097')
  ).toBeVisible();
  await page.getByLabel('increment-steps').click();
  await page.getByLabel('increment-steps').click();
  await page.getByLabel('increment-steps').click();
});
