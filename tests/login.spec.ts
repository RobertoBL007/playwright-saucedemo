import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import * as allure from 'allure-js-commons';
import { CheckoutPage } from '../pages/CheckoutPage';
import usersData from '../fixtures/data/users.json';
import namesForPay from '../fixtures/data/namesForPay.json';


 test.describe('Login en Saucedemo', () => {


  test('login correcto lleva al inventario', async ({ page }) => {
    await allure.feature('Login');
    await allure.description('El usuario debe poder iniciar sesión correctamente y ser redirigido al inventario');
    await allure.severity('critical');
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');
    await inventoryPage.waitForLoad();

  await expect(page.getByText('TEXTO_QUE_NO_EXISTE')).toBeVisible();
    await expect(inventoryPage.getProductCount()).resolves.toBe(6);
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


  for (const userData of usersData) {
    
    test(`login correcto con ${userData.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.login(userData.username, userData.password);
      await page.waitForURL('**/inventory.html');
      await inventoryPage.waitForLoad();

      await expect(await inventoryPage.isLoaded()).toBeVisible();
      await expect(inventoryPage.getProductCount()).resolves.toBe(6);
    });
  }

  for (const nameForPay of namesForPay) {
    test(`Ciclo Completo con compra para ${nameForPay.name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      const checkoutPage = new CheckoutPage(page);
      const user = usersData[0];
      const cartPage = new CartPage(page);
 
      await loginPage.goto();
      await loginPage.login(user.username, user.password);
      await page.waitForURL('**/inventory.html');
      await inventoryPage.waitForLoad();
      await inventoryPage.addToCart('add-to-cart-sauce-labs-backpack');
      await inventoryPage.addToCart('add-to-cart-sauce-labs-bike-light');
      await cartPage.goto();

      await checkoutPage.goto();
      await checkoutPage.fillCheckoutInfo(nameForPay.name, nameForPay.lastname, nameForPay.postalCode);
      await checkoutPage.continueCheckout();
      await checkoutPage.finishCheckout();

    }); 
  }
});


