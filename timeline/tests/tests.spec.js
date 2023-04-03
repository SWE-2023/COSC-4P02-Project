// @ts-check
import { test, expect } from '@playwright/test';

test('test timeline interaction', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Explore the Timeline' }).click();
  await page.getByRole('button', { name: '1975' }).click();
  await page.getByRole('button', { name: '1874' }).click();
  await page.getByRole('button', { name: 'add' }).click();
  await page.getByRole('button', { name: 'add' }).click();
  await page.getByText('1760').click();
  await page.getByRole('button', { name: '1764' }).click();
  await page.getByRole('button', { name: '1783' }).click();
  await page.getByRole('button', { name: '1726' }).click();
  await page.getByRole('button', { name: '1764' }).click();
});

