import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightPage {

  private readonly getStartedLink: Locator;
  private readonly installationHeading: Locator;

  constructor(public readonly page: Page) {
    this.getStartedLink = this.page.getByRole('link', { name: 'Get started' });
    this.installationHeading = this.page.getByRole('heading', { name: 'Installation' });
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }

  async clickButton(buttonName: string) {
    await this.page.getByRole('button', { name: buttonName }).click();
  }

  async verifyLinkVisible(linkName: string, regionRole: string = 'navigation', regionName: string = 'Main') {
    const regionLocator = this.page.getByRole(regionRole as any, { name: regionName });
    await expect(regionLocator.getByRole('link', { name: linkName })).toBeVisible();
  }

  async verifyTextIsVisible(text: string) {
    await expect(this.page.getByText(text, { exact: true })).toBeVisible();
  }

  async verifyButtonVisible(buttonName: string) {
    await expect(this.page.getByRole('button', { name: buttonName })).toBeVisible();
  }

  getInstallationHeading(): Locator {
    return this.installationHeading;
  }
}
