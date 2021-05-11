import { browser, element, by } from "protractor";

export class LoginPage{
    navigateTo() {
        return browser.get('/user/login');
    }

    fillLoginFormAndSubmit() {
//        element(by.xpath('/html/body/app-root/app-login/form/mat-form-field[1]/div/div[1]/div/input'))  refer to inputText element
        element(by.id('loginFormEmailField')).sendKeys('pp@pp.hu');
        element(by.id('loginFormPasswordField')).sendKeys('pass01');

        return element(by.buttonText('Log In')).click();
    }

    getNavBarUserName() {
        return element(by.xpath('/html/body/app-root/app-navigation/mat-toolbar/span[2]')).getText();
    }

}