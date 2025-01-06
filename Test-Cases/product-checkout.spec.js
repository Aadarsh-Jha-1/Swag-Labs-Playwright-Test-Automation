import { test, expect } from '@playwright/test';

import { login } from '../Resources/functions';

import { inventoryPage } from '../Resources/url';

let page, context;

test.describe('set test cases for product checkout flow', () => {

    let producItem,itemsInCart, cartButton;

test.beforeEach(async ({ browser }) => {

    context = await browser.newContext();

    page = await context.newPage();

    producItem = page.locator("(//div[@class='inventory_item'])");

    itemsInCart = page.locator("//span[@class='shopping_cart_badge']");

    cartButton = page.locator("//a[@class='shopping_cart_link']");

   
});

test('Successful checkout flow', async () => {

    await login(page, 'standard_user', 'secret_sauce');

    await expect(page).toHaveTitle('Swag Labs');

    const backpackAddToCart = page.locator('#add-to-cart-sauce-labs-backpack');

    await backpackAddToCart.click();

    const bikeLightAddToCart = page.locator('#add-to-cart-sauce-labs-bike-light');

    await bikeLightAddToCart.click();

    await cartButton.click();

    const saucelabBackpack = page.getByText('Sauce Labs Backpack');

    await expect(saucelabBackpack).toBeVisible();

    const saucelabBikeLight = page.getByText('Sauce Labs Bike Light');

    await expect(saucelabBikeLight).toBeVisible();

    await page.locator('#checkout').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    await page.getByPlaceholder('First Name').fill('Test');

    await page.getByPlaceholder('Last Name').fill('Automation');

    await page.getByPlaceholder('Zip/Postal Code').fill('123456');

    await page.locator('#continue').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    await expect(saucelabBackpack).toBeVisible();

    await expect(saucelabBikeLight).toBeVisible();

    await page.locator('#finish').click();

    await  expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

    const thankyouMsg = page.getByText('Thank you for your order!');

    await expect(thankyouMsg).toBeVisible();

    await page.locator('#back-to-products').click();

    await  expect(page).toHaveURL(inventoryPage);



})



})