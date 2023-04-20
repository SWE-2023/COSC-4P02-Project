import { test, expect } from '@playwright/test';
// POPUP CLICK TEST

test('Check Popup Open on Explore Click', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Explore the Timeline' }).click();
  await expect(page).toHaveTitle("Timeline | Niagara-on-the-Lake Timeline");
});

