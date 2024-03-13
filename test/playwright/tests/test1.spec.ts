import { test, expect, Browser, Page } from '@playwright/test';

let url = 'http://localhost:8080/';
let envUrl = process.env.URL;
if (envUrl) {
  url = envUrl.toString();
}
test('Warmup Test', async({ page, browser}) => {
  const context = await browser.newContext({ userAgent: 'Warmup' });
  page = await context.newPage()
  await page.goto(url);
  await page.getByRole('button', { name: 'Go Shopping' }).click();
  await page.locator('div:nth-child(2) > .sc-8119fd44-1').click();
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.locator('#email').click();
  await page.locator('#email').press('Meta+ArrowLeft');
  await page.locator('#email').fill('warmup@gmail.com');
  await page.locator('#email').press('Tab');
  await page.getByRole('button', { name: 'Place Order' }).click();
  await expect(page.getByText('Your order is complete!')).toBeAttached();
  
});

// add single item to cart and place order
test('Test 1', async({ page, browser}) => {
  const context = await browser.newContext({ userAgent: 'Test 1'});
  page = await context.newPage()
  await page.goto(url);
  await page.getByRole('button', { name: 'Go Shopping' }).click();
  await page.locator('div:nth-child(2) > .sc-8119fd44-1').click();
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.locator('#email').click();
  await page.locator('#email').press('Meta+ArrowLeft');
  await page.locator('#email').fill('test1@gmail.com');
  await page.locator('#email').press('Tab');
  await page.getByRole('button', { name: 'Place Order' }).click();
  await expect(page.getByText('Your order is complete!')).toBeAttached();
});

// add multiple items to cart and place order
test('Test 2', async({ page, browser}) => {
  const context = await browser.newContext({ userAgent: 'Test 2'});
  page = await context.newPage()
  await page.goto(url);
  await page.locator('.sc-8119fd44-1').first().click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(5) > .sc-8119fd44-1').click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(4) > .sc-8119fd44-1').click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.locator('#email').fill('test2@example.com');
  await page.getByRole('button', { name: 'Place Order' }).click();

});

// add multiple items to cart change dollars to euros and place order
test('Test 3', async({ page, browser}) => {
  const context = await browser.newContext({ userAgent: 'Test 3'});
  page = await context.newPage()
  await page.goto(url);
  await page.getByRole('combobox').selectOption('EUR');
  await page.locator('.sc-8119fd44-1').first().click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(5) > .sc-8119fd44-1').click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(4) > .sc-8119fd44-1').click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.locator('#email').fill('test3@example.com');
  await page.getByRole('button', { name: 'Place Order' }).click();

});
// add multiple items to cart then empty cart and add multiple items again and place order
test('Test 4', async({ page, browser}) => {
  const context = await browser.newContext({ userAgent: 'Test 4'});
  page = await context.newPage()
  await page.goto(url);
  await page.locator('.sc-8119fd44-1').first().click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(5) > .sc-8119fd44-1').click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(4) > .sc-8119fd44-1').click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.getByRole('button', { name: 'Empty Cart' }).click();
  await page.locator('.sc-8119fd44-1').first().click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(5) > .sc-8119fd44-1').click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.locator('div:nth-child(4) > .sc-8119fd44-1').click();
  await page.getByRole('main').getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'cart Add To Cart' }).click();
  await page.locator('#email').fill('test4@example.com');
  await page.getByRole('button', { name: 'Place Order' }).click();
});
