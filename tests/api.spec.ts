import { test, expect } from './fixtures';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import dotenv from 'dotenv';
import path from 'path';
import { request } from 'playwright/types/test';

test('petición GET', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
await expect(response.status()).toBe(200);
});

test('petición POST', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
  });
  const responseData = await response.json();
  await expect(responseData.title).toBe('foo');
  await expect(response.status()).toBe(201);
});

test('crear usuario con POST devuelve nombre y status 201', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/users', {
    data: {
      name: 'Roberto',
      job: 'QA Engineer'
    }
  });
  
  const responseData = await response.json();
  await expect(responseData.name).toBe('Roberto');
  await expect(response.status()).toBe(201);
});

test('Simular un estado 500 en la petición GET', async ({ page }) => {
  // Intercept the request and fulfill with a simulated 500 response
  await page.route('https://www.saucedemo.com/**', route => {
    route.fulfill({ status: 500, body: '500 simulado' });
  });
  const response = await page.goto('https://www.saucedemo.com/');
  await expect(response!.status()).toBe(500);
});

test('petición GET con espera en respuesta', async ({ page }) => {
    const responsePromise = page.waitForResponse('**/posts/1'); 
    await page.goto('https://jsonplaceholder.typicode.com/posts/1');
    const response = await responsePromise;
    await expect(response.status()).toBe(200);
});

test('petición POST con datos', async ({request, authenticatedPage}) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
  });
  const responseData = await response.json();
    await expect(responseData.title).toBe('foo');
    await expect(response.status()).toBe(201);
  const { inventoryPage } = authenticatedPage;
  const cartPage = new CartPage(inventoryPage.page);
   const productos =[
    'add-to-cart-sauce-labs-backpack',
    'add-to-cart-sauce-labs-bike-light',
    'add-to-cart-test.allthethings()-t-shirt-(red)',
    'add-to-cart-sauce-labs-onesie',
    'add-to-cart-sauce-labs-bolt-t-shirt',
    'add-to-cart-sauce-labs-fleece-jacket',
   ];
    for (const producto of productos) {
    await inventoryPage.addToCart(producto);
  }
    await cartPage.goto();
    await expect(cartPage.isLoaded()).resolves.toBeVisible();
    await expect(await cartPage.getCartItemCount()).toBe(6);
});



