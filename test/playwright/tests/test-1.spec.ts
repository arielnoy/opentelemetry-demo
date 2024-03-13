import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.locator('.sc-8119fd44-1').first().click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(5) > .sc-8119fd44-1').click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.locator('#email').fill('Ariel@example.com');
  await page.getByRole('button', { name: 'Place Order' }).click();
});