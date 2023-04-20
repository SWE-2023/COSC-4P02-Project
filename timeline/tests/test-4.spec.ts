import { test, expect } from '@playwright/test';
// LOGIN PAGE TEST


// Test to see if unauthorized email is rejected
test('Invalid Login Attempt', async ({ page }) => {
  await page.goto('http://localhost:5173/login#');
  await page.getByPlaceholder('username@email.com').click();
  await page.getByPlaceholder('username@email.com').fill('Test@test.ca');
  await page.getByRole('button', { name: 'Send Log In Link' }).click();
  await page.getByRole('button', { name: '✕' }).click();
  page.on('dialog',async dialog => {
    expect(dialog.type()).toContain('Error');
    expect (dialog.message()).toContain('Please login with a verified admin account');
  })

});
