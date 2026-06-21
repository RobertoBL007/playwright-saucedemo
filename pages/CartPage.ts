import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async getCartItemCount() {
    return await this.page.locator('.cart_item').count();
  }

  async isLoaded() {
    return this.page.getByText('Your Cart');
  }
}