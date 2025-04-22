const {
    Login,
    Logout
} = require('../PageObject/Login/Login.page.js');

describe('Login', () => {
    // Runs before each test to ensure a fresh login session
    beforeEach(async () => {
        await Login();
    });

    // Runs after each test to logout and reset the session
    afterEach(async () => {
        await Logout();
        await browser.reloadSession();
    });
    it('Verify that user should be able to log in to the application', async () => {
        await Login();
    })
})