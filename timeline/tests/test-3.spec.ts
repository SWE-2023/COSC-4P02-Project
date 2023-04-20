import { test, expect } from '@playwright/test';
// CONTACT PAGE TEST


// Test to see if invalid number is rejcected with a popup
test('Invalid number popup', async ({ page }) => {
  await page.goto('http://localhost:5173/contact');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Test');
  await page.getByPlaceholder('Phone').click();
  await page.getByPlaceholder('Phone').fill('1');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test@gmail.ca');
  await page.locator('#type').selectOption('About the timeline');
  await page.locator('#type').click();
  await page.getByPlaceholder('Message').click();
  await page.getByPlaceholder('Message').fill('test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: '✕' }).click();
  page.on('dialog',async dialog => {
    expect(dialog.type()).toContain('Error');

    expect (dialog.message()).toContain('Please enter a valid phone number');
  })

});

// Test to see if invalid email is rejcected with a popup
test('Invalid email popup', async ({ page }) => {
  await page.goto('http://localhost:5173/contact');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Test');
  await page.getByPlaceholder('Phone').click();
  await page.getByPlaceholder('Phone').fill('1111111111');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test');
  await page.locator('#type').selectOption('About the timeline');
  await page.locator('#type').click();
  await page.getByPlaceholder('Message').click();
  await page.getByPlaceholder('Message').fill('test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: '✕' }).click();
  page.on('dialog',async dialog => {
    expect(dialog.type()).toContain('Error');

    expect (dialog.message()).toContain('Please enter a email address');
  })

});

// Test to see if empty fields are rejcected with a popup
test('Empty fields popup', async ({ page }) => {
  await page.goto('http://localhost:5173/contact');
  await page.locator('#type').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: '✕' }).click();
  page.on('dialog',async dialog => {
    expect(dialog.type()).toContain('Error');

    expect (dialog.message()).toContain('Please fill out all fields before submitting');
  })
});

// Test to see if appropriate fields are accepted with a popup
test('Accepted fields popup', async ({ page }) => {
  await page.goto('http://localhost:5173/contact');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Test');
  await page.getByPlaceholder('Phone').click();
  await page.getByPlaceholder('Phone').fill('1111111111');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test@gmail.ca');
  await page.locator('#type').selectOption('About the timeline');
  await page.locator('#type').click();
  await page.getByPlaceholder('Message').click();
  await page.getByPlaceholder('Message').fill('test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: '✕' }).click();
  page.on('dialog',async dialog => {
    expect(dialog.type()).toContain('Inquiry Submitted');
  })
});



