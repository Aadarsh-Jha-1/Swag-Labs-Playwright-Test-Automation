import { test, expect } from '@playwright/test';

import { login } from '../Resources/functions';

import { baseUrl, inventoryPage } from '../Resources/url';

let page, context;

test.describe('set test cases for Inventory Page', () => {

    let producItem, sortingDropdown;

    
    test.beforeEach(async ({ browser }) => {

        context = await browser.newContext();

        page = await context.newPage();

        producItem = page.locator("(//div[@class='inventory_item'])");

        sortingDropdown = page.locator('[data-test="product-sort-container"]');

       
    });

    
    test('Validate total number of products on inventory page', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle('Swag Labs');
        
        await expect(producItem).toHaveCount(6);

    });

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




    
    test.afterEach(async () => {
           
            await page.close();
           
            await context.close();
        });
    })