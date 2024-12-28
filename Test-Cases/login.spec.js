import { test, expect } from '@playwright/test';

import { login } from '../Resources/functions';

import { baseUrl, inventoryPage } from '../Resources/url';

let page, context;

test.describe('set test cases for login module', () => {
    
    test.beforeEach(async ({ browser }) => {
        // Create a new browser context (independent session)
        context = await browser.newContext();

        // Create a new page in the context
        page = await context.newPage();
    });

    test('successful login', async () => {

        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveURL(inventoryPage);

        await expect(page).toHaveTitle('Swag Labs');
    });


    test('invalid password', async () => {

        await login(page, 'standard_user', 'secret_sauc');

        const errorMessage = page.getByText("Epic sadface: Username and password do not match any user in this service");

        await expect(errorMessage).toBeVisible();
    });


    test('invalid username', async () => {

        await login(page, 'standard', 'secret_sauce');

        const errorMessage = page.getByText("Epic sadface: Username and password do not match any user in this service");

        await expect(errorMessage).toBeVisible();
    });


    test('invalid credentials', async () => {

        await login(page, 'standard', 'secret_sauc');

        const errorMessage = page.getByText("Epic sadface: Username and password do not match any user in this service");

        await expect(errorMessage).toBeVisible();
    });

   
    test('empty fields', async()=>{

        await page.goto(baseUrl);

        const loginBtn = page.locator('#login-button');

        await loginBtn.click();

        const errorMessage = page.getByText('Epic sadface: Username is required');

        await expect(errorMessage).toBeVisible();
    });


    test('locked_out_user', async()=>{

        await login(page, 'locked_out_user', 'secret_sauce');

        const errorMessage = page.getByText("Epic sadface: Sorry, this user has been locked out.");

        await expect(errorMessage).toBeVisible();
    
    });

    
    test('problem_user', async () => {
      
        await login(page, 'problem_user', 'secret_sauce');

        await expect(page).toHaveURL(inventoryPage);

        await expect(page).toHaveTitle('Swag Labs');
    });

    
    test('performance_glitch_user', async () => {
       
        await login(page, 'performance_glitch_user', 'secret_sauce');

        await expect(page).toHaveURL(inventoryPage);

        await expect(page).toHaveTitle('Swag Labs');
    });

    
    test('error_user', async () => {
       
        await login(page, 'error_user', 'secret_sauce');

        await expect(page).toHaveURL(inventoryPage);

        await expect(page).toHaveTitle('Swag Labs');
    });

    
    test('visual_user', async () => {

        await login(page, 'visual_user', 'secret_sauce');

        await expect(page).toHaveURL(inventoryPage);

        await expect(page).toHaveTitle('Swag Labs');
    });



    

    test.afterEach(async () => {
       
        console.log('Test completed');
        // Close the page and context
       
        await page.close();
       
        await context.close();
    });
});
