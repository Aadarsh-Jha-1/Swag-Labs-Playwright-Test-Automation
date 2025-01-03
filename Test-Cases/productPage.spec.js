import { test, expect } from '@playwright/test';

import { navigateToProductPage } from '../Resources/functions';

import { inventoryPage } from '../Resources/url';

let page, context;

test.describe('set of test cases for individual product page', () => {

    let addToCart, removeBtn, itemsInCart, backToProducts;
    
    test.beforeEach(async ({ browser }) => {
        
        context = await browser.newContext();

        page = await context.newPage();

        addToCart = page.locator("//button[@id='add-to-cart']");

        removeBtn = page.locator("//button[@id='remove']");

        itemsInCart = page.locator("//span[@class='shopping_cart_badge']");

        backToProducts = page.locator("//button[@id='back-to-products']");


    });


    test('Navigation To Product Page', async () => {

        await navigateToProductPage(page,'standard_user', 'secret_sauce');

        //validate you are on the correct product page.

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4");

    })


    test('Add to cart Button', async () => {

        await navigateToProductPage(page,'standard_user', 'secret_sauce');

        //validate you are on the correct product page.

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4");

        await addToCart.click();

        await expect(removeBtn).toBeVisible();

        await expect(itemsInCart).toBeVisible();

        await expect(itemsInCart).toContainText("1");

    })

    test('Back To Products Button', async()=>{

        await navigateToProductPage(page,'standard_user', 'secret_sauce');

        //validate you are on the correct product page.

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4");

        await backToProducts.click();

        await expect(page).toHaveURL(inventoryPage);

    })




})