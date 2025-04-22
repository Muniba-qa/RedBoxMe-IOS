const { Login } = require('../PageObject/Login/Login.page.js');
const  {
    verifyAgorasPostTitle,
    verifyAgorasPostShortDescription
} = require('../PageObject/Agoras/Agoras.page');

describe('Agoras Tab', () => {
    beforeEach(async () => {
        await Login();
    });
    afterEach(async () => {
        await browser.reloadSession();
    });

    it('Verify the "Show Translation" feature works on the Agoras post title', async () => {
        await verifyAgorasPostTitle('Agora finished');
    });
    it('Verify the "Show Translation" feature works on the Agoras post Short Description', async () => {
        await verifyAgorasPostShortDescription("AI is much more dangerous.");
    });

})