import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://playwright.dev/');
  await page.screenshot({ path: 'test-results/global-setup.png', fullPage: true });

  await browser.close();
}

export default globalSetup;
