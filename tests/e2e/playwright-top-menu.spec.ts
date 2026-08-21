import { test } from '@playwright/test';
import { PlaywrightPage } from '../pages/playwright-page';

/* This test is a simple example of how to use Playwright to test a web page.
 * It uses the PlaywrightPage class to interact with the page and verify that certain elements are visible and clickable.
 */
test.describe('playwright top menu', () => {
  let playwrightPage: PlaywrightPage;

  test.beforeEach(async ({ page }) => {
    playwrightPage = new PlaywrightPage(page);
    await playwrightPage.goto();
  });

  test('shows the top menu links', async () => {
    await playwrightPage.verifyLinkVisible('Docs');
    await playwrightPage.verifyTextIsVisible('MCP');
    await playwrightPage.verifyLinkVisible('API');
    await playwrightPage.verifyButtonVisible('Node.js');
    await playwrightPage.clickButton('Node.js');
    await playwrightPage.verifyLinkVisible('Python');
    await playwrightPage.verifyLinkVisible('Java');
    await playwrightPage.verifyLinkVisible('.NET');
    await playwrightPage.verifyLinkVisible('Node.js');
  });
});
