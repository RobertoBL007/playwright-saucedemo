import test, { Page } from '@playwright/test';

export class CheckoutPage {
    
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }


async goto() {
    await this.page.locator('.checkout_button').click();
    await this.page.waitForURL('**/checkout-step-one.html');
    }

async fillCheckoutInfo(name: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(name);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

async continueCheckout() {
    await this.page.locator('[data-test="continue"]').click();
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
    await this.page.waitForURL('**/checkout-complete.html');
  }

}