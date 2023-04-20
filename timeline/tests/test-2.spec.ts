import { test, expect } from '@playwright/test';
// URL TESTS


// Tests if timeline url is correct
test('get explore link', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTitle('Explore the timeline').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page).toHaveURL(/.*timeline/);
});

// Tests if contact url is correct
test('get contact link', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/.*contact/);
});

// Tests if about url is correct
test('get about link', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/.*about/);
});
// Tests if login url is correct
test('get login link', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', {  name: 'Log In login' , exact: true }).click();
  await expect(page).toHaveURL(/.*login/);
});


