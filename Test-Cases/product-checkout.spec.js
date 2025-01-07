import { test, expect } from '@playwright/test';

import { login } from '../Resources/functions';

import { cartPage, inventoryPage } from '../Resources/url';

import { username, password } from '../Resources/test-Data';

let page, context;

test.describe('set test cases for product checkout flow', () => {

    let producItem,itemsInCart, cartButton, CountinueShopping, backpackAddToCart,  bikeLightAddToCart, cancelBtn;

test.beforeEach(async ({ browser }) => {

    context = await browser.newContext();

    page = await context.newPage();

    producItem = page.locator("(//div[@class='inventory_item'])");

    itemsInCart = page.locator("//span[@class='shopping_cart_badge']");

    cartButton = page.locator("//a[@class='shopping_cart_link']");

    CountinueShopping = page.locator("#continue-shopping");

    backpackAddToCart = page.locator('#add-to-cart-sauce-labs-backpack');

    bikeLightAddToCart = page.locator('#add-to-cart-sauce-labs-bike-light');

    cancelBtn = page.locator("#cancel");
 
});


test('Successful checkout flow', async () => {

    await login(page, username, password);

    await expect(page).toHaveTitle('Swag Labs');

    await backpackAddToCart.click();

    await bikeLightAddToCart.click();

    await cartButton.click();

    const saucelabBackpack = page.getByText('Sauce Labs Backpack');

    await expect(saucelabBackpack).toBeVisible();

    const saucelabBikeLight = page.getByText('Sauce Labs Bike Light');

    await expect(saucelabBikeLight).toBeVisible();

    await page.locator('#checkout').click();



    // Checkout: Your Information Page Assertions

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    await page.locator('#continue').click();

    const requiredFieldError = page.getByText('Error: First Name is required');

    await expect(requiredFieldError).toBeVisible();

    await page.getByPlaceholder('First Name').fill('Test');

    await page.locator('#continue').click();

    const requiredFieldError2 = page.getByText('Error: Last Name is required');

    await expect(requiredFieldError2).toBeVisible();

    await page.getByPlaceholder('Last Name').fill('Automation');

    await page.locator('#continue').click();

    const requiredFieldError3 = page.getByText('Error: Postal Code is required');

    await expect(requiredFieldError3).toBeVisible();

    await page.getByPlaceholder('Zip/Postal Code').fill('123456');

    await page.locator('#continue').click();

    
    
    // Checkout: Overview page Assertions

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    await expect(saucelabBackpack).toBeVisible();

    await expect(saucelabBikeLight).toBeVisible();


    //Extract Price 1

    const item1PriceLocator = page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1)");

    const item1Price = await item1PriceLocator.textContent();

    const extractPriceContent = item1Price.slice("1"); // remove dollar sign

    const price1 = parseFloat(extractPriceContent); //  convert string to floating number


    //Extract price 2 

    const item2PriceLocator = page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1)");

    const item2Price = await item2PriceLocator.textContent();

    const extractPriceContent2 = item2Price.slice("1"); // remove dollar sign

    const price2 = parseFloat(extractPriceContent2); //  convert string to floating number

    // Total Price

    const actualTotalPrice = price1+price2;


    // Visble Total Price Extractor

    const totalPriceLocator = page.locator("//div[@class='summary_subtotal_label']");

    const totalPrice = await totalPriceLocator.textContent();

    console.log(totalPrice);

    const extractPriceContent3 = totalPrice.slice("13"); // remove dollar sign

    const visibleTotalPrice = parseFloat(extractPriceContent3); //  convert string to floating number

    console.log(visibleTotalPrice);

    expect(visibleTotalPrice).toEqual(actualTotalPrice);

    await page.locator('#finish').click();

   
   
    //Thank You Page Assertions

    await  expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

    const thankyouMsg = page.getByText('Thank you for your order!');

    await expect(thankyouMsg).toBeVisible();

    await page.locator('#back-to-products').click();

    await  expect(page).toHaveURL(inventoryPage);



})

test('Working Of Countinue Shopping Button On Cart Page', async () => {

    await login(page, username, password);

    await expect(page).toHaveTitle('Swag Labs');

    await backpackAddToCart.click();

    await bikeLightAddToCart.click();

    await cartButton.click();

    await CountinueShopping.click();

    await expect(page).toHaveURL(inventoryPage);

})

test('Working of cancel Button on Your Information page ', async()=>{

    await login(page, username, password);

    await expect(page).toHaveTitle('Swag Labs');

    await backpackAddToCart.click();

    await bikeLightAddToCart.click();

    await cartButton.click();

    await page.locator('#checkout').click();

    await cancelBtn.click();

    await expect(page).toHaveURL(cartPage);



})

test('Working of cancel Button on Checkout Overview page ', async()=>{

    await login(page, username, password);

    await expect(page).toHaveTitle('Swag Labs');

    await backpackAddToCart.click();

    await bikeLightAddToCart.click();

    await cartButton.click();

    await page.locator('#checkout').click();

    await page.getByPlaceholder('First Name').fill('Test');

    await page.getByPlaceholder('Last Name').fill('Automation');

    await page.getByPlaceholder('Zip/Postal Code').fill('123456');

    await page.locator('#continue').click();

    await cancelBtn.click();

    await expect(page).toHaveURL(inventoryPage);


})




})