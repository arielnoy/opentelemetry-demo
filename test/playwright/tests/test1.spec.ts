import { test, expect, Browser, Page } from '@playwright/test';


for (let i = 0; i < 10; i++) {
  test('Test '+i, async({ page, browser}) => {
    const context = await browser.newContext({ userAgent: 'Test ' + i });
    page = await context.newPage()
    await page.goto('http://localhost:8080/');
    await page.getByRole('button', { name: 'Go Shopping' }).click();
    await page.locator('div:nth-child(2) > .sc-8119fd44-1').click();
    await page.getByRole('button', { name: 'cart Add To Cart' }).click();
    await page.locator('#email').click();
    await page.locator('#email').press('Meta+ArrowLeft');
    await page.locator('#email').fill('ariel'+i+'@gmail.com');
    await page.locator('#email').press('Tab');
    await page.getByRole('button', { name: 'Place Order' }).click();
    await expect(page.getByText('Your order is complet11e!')).toBeAttached();
    
  });

}

