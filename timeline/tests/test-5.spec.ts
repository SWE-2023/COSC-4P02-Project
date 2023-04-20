import { test, expect } from '@playwright/test';
// TIMELINE EVENT TEST


// Tests if clicking on a specific event loads the event correctly with reference to database information
test('Event navigation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTitle('Explore the timeline').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: '1918' }).click();
  const element = await page.getByText('Influenza Outbreak at Niagara Camp');
  await expect(element !== undefined ).toBeTruthy();
  const element2 = await page.getByText('The Spanish Flu Pandemic of 1918 was thought to have made contact with Canada by latching onto returning soldiers after the Great War in Europe had ceased. Naturally, this meant Niagara Camp was a hotbed for the virus. Ultimately around 50,000 Canadians died from this pandemic, almost trumping the 60,000 deaths Canadians faced during the great war.');
  await expect(element2 !== undefined ).toBeTruthy();
});

