import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForSelector('.inventory_list');
  }

  async getProductCount() {
    return await this.page.locator('.inventory_item').count();
  }

  async addToCart(productDataTest: string) {
    await this.page.locator(`[data-test="${productDataTest}"]`).click();
  }

  async isLoaded() {
    return this.page.getByText('Products');
  }
}