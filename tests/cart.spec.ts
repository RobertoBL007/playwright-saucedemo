import { test, expect } from './fixtures';
import { CartPage } from '../pages/CartPage';

test.describe('Carrito en Saucedemo', () => {

  test('añadir producto al carrito', async ({ authenticatedPage, page }) => {
    const { inventoryPage } = authenticatedPage;
    const cartPage = new CartPage(page);

    // Añadir producto
    await inventoryPage.addToCart('add-to-cart-sauce-labs-backpack');

    // Ir al carrito y verificar
    await cartPage.goto();
    await expect(await cartPage.isLoaded()).toBeVisible();
    await expect(await cartPage.getCartItemCount()).toBe(1);
  });


  test('añadir varios productos al carrito', async ({ authenticatedPage, page }) => {
    const { inventoryPage } = authenticatedPage;
    const cartPage = new CartPage(page);  

    // Añadir productos
    await inventoryPage.addToCart('add-to-cart-sauce-labs-backpack');
    await inventoryPage.addToCart('add-to-cart-sauce-labs-bike-light');

    // Ir al carrito y verificar
    await cartPage.goto();
    await expect(cartPage.isLoaded()).resolves.toBeVisible();
    await expect(await cartPage.getCartItemCount()).toBe(2);
  });
}); 