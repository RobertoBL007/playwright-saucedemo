import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login en Saucedemo', () => {

  test('login correcto lleva al inventario', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');
    await inventoryPage.waitForLoad();

    await expect(await inventoryPage.isLoaded()).toBeVisible();
    await expect(await inventoryPage.getProductCount()).toBe(6);
  });

  test('login incorrecto muestra error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'mal_password');

    await expect(await loginPage.getErrorMessage()).toBeVisible();
  });

  test('usuario bloqueado no puede entrar', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(page).not.toHaveURL(/inventory/);
    await expect(await loginPage.getErrorMessage()).toBeVisible();
  });

});