import { test, expect } from '@playwright/test';

test('Login and account creation flow', async ({ page }) => {
    // Step 1: Open the Login Page.
    await page.goto('https://news.ycombinator.com/login');

    // Step 2: Verify the presence of the "acct" input field.
    const acctInput = page.getByPlaceholder('username');
    await expect(acctInput).toBeVisible();

    // Step 3: Enter a valid username in the "acct" input field.
    await acctInput.fill('valid_username');

    // Step 4: Verify the presence of the "pw" input field.
    const pwInput = page.getByPlaceholder('password');
    await expect(pwInput).toBeVisible();

    // Step 5: Enter a valid password in the "pw" input field.
    await pwInput.fill('valid_password');

    // Step 6: Verify the presence of the "login" button.
    const loginButton = page.getByRole('button', { name: 'login' });
    await expect(loginButton).toBeVisible();

    // Step 7: Click the "login" button.
    await loginButton.click();

    // Step 8: Verify successful login by checking for a redirect to the homepage or a welcome message.
    await expect(page).toHaveURL('https://news.ycombinator.com/');
    await expect(page.getByText('Welcome')).toBeVisible();

    // Step 9: Verify the presence of the "Forgot your password?" link.
    const forgotPasswordLink = page.getByText('Forgot your password?');
    await expect(forgotPasswordLink).toBeVisible();

    // Step 10: Verify the presence of the "create account" button.
    const createAccountButton = page.getByRole('button', { name: 'create account' });
    await expect(createAccountButton).toBeVisible();

    // Step 11: Click the "create account" button.
    await createAccountButton.click();

    // Step 12: Verify the presence of the account creation page or form.
    await expect(page.getByText('Create Account')).toBeVisible();
});