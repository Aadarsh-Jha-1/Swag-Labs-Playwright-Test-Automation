import { test, expect } from '@playwright/test';

import { login } from '../Resources/functions';

import { baseUrl, inventoryPage } from '../Resources/url';

let page, context;

test.describe('set test cases for Inventory Page', () => {

    let producItem, sortingDropdown, navBtn;

    
    test.beforeEach(async ({ browser }) => {

        context = await browser.newContext();

        page = await context.newPage();

        producItem = page.locator("(//div[@class='inventory_item'])");

        sortingDropdown = page.locator('[data-test="product-sort-container"]');

        navBtn = page.locator('#react-burger-menu-btn');

       
    });

    // Number of Projects on invetory Page
    
    test('Validate total number of products on inventory page', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle('Swag Labs');
        
        await expect(producItem).toHaveCount(6);

    });


    // Sorting of elements on inventory page

    test('Validate sorting Name (A To Z)', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle('Swag Labs');

        await sortingDropdown.click();

        await page.locator('[data-test="product-sort-container"]').selectOption('az');

        await expect(producItem.nth(0)).toContainText('Sauce Labs Backpack');

        await expect(producItem.nth(5)).toContainText('Test.allTheThings() T-Shirt (Red)');


    });

    test('Validate sorting Name (Z To A)', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle('Swag Labs');

        await sortingDropdown.click();

        await page.locator('[data-test="product-sort-container"]').selectOption('za');

        await expect(producItem.nth(0)).toContainText('Test.allTheThings() T-Shirt (Red)');

        await expect(producItem.nth(5)).toContainText('Sauce Labs Backpack');

    });

    test('Validate sorting Price (Low To High)', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle('Swag Labs');

        await page.waitForTimeout(3000);

        await sortingDropdown.click();

        await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

        await expect(producItem.nth(0)).toContainText('7.99');

        await expect(producItem.nth(5)).toContainText('49.99');

        await page.waitForTimeout(3000);

    });


    test('Validate sorting Price (High To Low)', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle('Swag Labs');

        await page.waitForTimeout(3000);

        await sortingDropdown.click();

        await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

        await expect(producItem.nth(0)).toContainText('49.99');

        await expect(producItem.nth(5)).toContainText('7.99');

        await page.waitForTimeout(3000);

    });


    // Hamburger Button or Naviagtion Button On top Left



test('Navigation Bar Redirections - All Items', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle('Swag Labs');

        await page.getByText('Sauce Labs Backpack').click();

        await page.waitForTimeout(3000);

        //validate you are on the correct product page.

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4");

       // Test All Items Button  In Nav Bar

        await navBtn.click();

        await page.waitForTimeout(2000);

        const allItemsBtn = page.locator('#inventory_sidebar_link');

        await allItemsBtn.click();

        await page.waitForTimeout(2000);

        // validate you are on inventory page now which have 6 product items

        await expect(producItem).toHaveCount(6);



    });


    test('Navigation Bar Redirections - About', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle('Swag Labs');

       // Test About Button  In Nav Bar

        await navBtn.click();

        await page.waitForTimeout(2000);

        const aboutBtn = page.locator('#about_sidebar_link');

        await aboutBtn.click();

        await page.waitForTimeout(2000);

        // validate you are on The About Page

       await expect(page).toHaveTitle('Sauce Labs: Cross Browser Testing, Selenium Testing & Mobile Testing');


    });



    test('Navigation Bar Redirections - Logout', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle('Swag Labs');

       // Test About Button  In Nav Bar

        await navBtn.click();

        await page.waitForTimeout(2000);

        const logoutBtn = page.locator('#logout_sidebar_link');

        await logoutBtn.click();

        await page.waitForTimeout(2000);

        // validate you are on The About Page

       await expect(page).toHaveURL('https://www.saucedemo.com/');


    });


    test('Navigation Bar Redirections - Reset App State', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle('Swag Labs');


        // Change the App State - Add Some product in the cart.


        const backpackAddToCart = page.locator('#add-to-cart-sauce-labs-backpack');

        await backpackAddToCart.click();

        const bikeLightAddToCart = page.locator('#add-to-cart-sauce-labs-bike-light');

        await bikeLightAddToCart.click();

       // Test About Button  In Nav Bar

        await navBtn.click();

        await page.waitForTimeout(2000);

        const resetBtn = page.locator('#reset_sidebar_link');

        await resetBtn.click();

        await page.waitForTimeout(2000);

        // validate you are on The About Page

       await expect(page).toHaveURL('https://www.saucedemo.com/');


    });










    
    test.afterEach(async () => {
           
            await page.close();
           
            await context.close();
        });
    })