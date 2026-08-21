import { test, expect } from '@playwright/test';

/* This test is a simple example of how to use Playwright to test a web page.
 * It demonstrates basic navigation and assertion techniques WITHOUT using a page object model. The test navigates to the Playwright website, verifies the page title, clicks on the "Get started" link, and checks for the visibility of the "Installation" heading.
 */
test.describe('Playwright Page ', () => {
  test('should have a title', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should have a get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});