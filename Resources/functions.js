import {baseUrl} from './url';

export async function login(page,username,password){

    const usernameTextField = page.getByPlaceholder('Username');

    const passwordField =  page.getByPlaceholder('Password');

    const loginBtn = page.locator('#login-button');

    await page.goto(baseUrl);

    await usernameTextField.click();

    await usernameTextField.fill(username);

    await passwordField.click();

    await passwordField.fill(password);

    await loginBtn.click();

}

export async function navigateToProductPage(page,username,password){

        await login(page,username,password);

        await page.getByText('Sauce Labs Backpack').click();

        await page.waitForTimeout(3000);
    
    }