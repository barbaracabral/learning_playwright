import { test, expect } from '@playwright/test';
import { PlaywrightPage } from '../pages/playwright-page';

/* This test is a simple example of how to use Playwright to test a web page. 
 * It uses the PlaywrightPage class to interact with the page and verify that certain elements are visible and clickable.
 */
test.describe('playwright page tests', () => {
  let playwrightPage: PlaywrightPage;

  test.beforeEach(async ({ page }) => {
    playwrightPage = new PlaywrightPage(page);
    await playwrightPage.goto();
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async () => {
    await playwrightPage.clickGetStarted();

    await expect(playwrightPage.getInstallationHeading()).toBeVisible();
  });
});
