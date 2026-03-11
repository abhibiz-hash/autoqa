import { test, expect } from '@playwright/test';

test('Test the Login functionality', async ({ page }) => {
    // Step 1: Navigate to the Login Page.
    await page.goto('https://news.ycombinator.com/login');

    // Step 2: Locate the input field for the username (name: "acct").
    const usernameInput = page.locator('[name="acct"]').first();

    // Step 3: Enter the username 'FakeUser999' into the username input field.
    await usernameInput.fill('FakeUser999');

    // Step 4: Locate the input field for the password (name: "pw").
    const passwordInput = page.locator('[name="pw"]').first();

    // Step 5: Enter the password 'BadPassword123' into the password input field.
    await passwordInput.fill('BadPassword123');

    // Step 6: Locate the submit button (text: "login").
    const loginButton = page.locator('input[type="submit"][value="login"]').first();

    // Step 7: Click the submit button to attempt to log in.
    await loginButton.click();

    // Step 8: Wait for the page to respond and check for the presence of an error message.
    await page.waitForSelector('text=Bad login');

    // Step 9: Assert that the error message contains the text 'Bad login'.
    const errorMessage = page.locator('text=Bad login').first();
    await expect(errorMessage).toBeVisible();
});