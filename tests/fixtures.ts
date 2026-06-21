import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

type MyFixtures = {
  authenticatedPage: { loginPage: LoginPage; inventoryPage: InventoryPage };
};

export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const username = process.env.SAUCE_USER;
    const password = process.env.SAUCE_PASS;

    await loginPage.goto();

    if (!username || !password) {
      throw new Error('USERNAME and PASSWORD environment variables are required');
    }
    
    await loginPage.login(username, password);
    await page.waitForURL('**/inventory.html');
    await inventoryPage.waitForLoad();

    await use({ loginPage, inventoryPage });
  },
});

export { expect } from '@playwright/test';