import { LoginPage } from "./login.po";

describe('Log in Process', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
    });

    it('should log me in', async () => {
        await page.navigateTo();
        // fill login form&click submit
        await page.fillLoginFormAndSubmit();
        // assert user name in navbar
        expect(await page.getNavBarUserName()).toBe(': ppp84');
    });

});