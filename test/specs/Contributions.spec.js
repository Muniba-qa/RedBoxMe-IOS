const {
    Login, 
    Logout
} =  require('../PageObject/Login/Login.page.js');
const {
    verifyShowTranslationFeatureForTitle,
    verifyShowTranslationFeatureForDiscription,
    verifyShowTranslationFeatureForComment
} = require('../PageObject/Contributions/Contributions.page.js')
describe('Contribution Tab', () => {

    beforeEach(async () => {
        await Login();
    });
    afterEach(async () => {
        await Logout();
        await browser.reloadSession();
    });

    it('Verify the "Show Translation" feature in the contribution tab for the Post title', async () => {
        await verifyShowTranslationFeatureForTitle('Este es el título de mi publicación', 'This is the title of my post');
    });
    it('Verify the "Show Translation" feature in the contribution tab for the Post content', async () => {
        await verifyShowTranslationFeatureForDiscription('Esta es la descripción de mi publicación', 'This is the description of my post');
    });
    it('Verify the "Show Translation" feature in the contribution tab for the Post comment', async () => {
        await verifyShowTranslationFeatureForComment('Este es mi comentario', 'This is my comment');
    });

    it('Verify the "Show Translation" feature in the contribution tab by using cedilla in the Post title', async () => {
        await verifyShowTranslationFeatureForTitle('Este es el título de mi publicación', 'This is the title of my post');
    });
    it('Verify the "Show Translation" feature in the contribution tab by using cedilla in the Post content', async () => {
        await verifyShowTranslationFeatureForDiscription('Esta es la descripción de mi publicación', 'This is the description of my post');
    });
    it('Verify the "Show Translation" feature in the contribution tab by using cedilla in the Post comment', async () => {
        await verifyShowTranslationFeatureForComment('Isto é meu comentário', 'This is my comment');
    });

    it('Verify the "Show Translation" feature in the contribution tab by using quotes in the Post title', async () => {
        await verifyShowTranslationFeatureForTitle('"Este es el título de mi publicación"', '"This is the title of my post"');
    });
    it('Verify the "Show Translation" feature in the contribution tab by using quotes in the Post content', async () => {
        await verifyShowTranslationFeatureForDiscription('"Esta es la descripción de mi publicación"', '"This is the description of my post"');
    });
    it('Verify the "Show Translation" feature in the contribution tab by using quotes in the Post comment', async () => {
        await verifyShowTranslationFeatureForComment('"Isto é meu comentário"', '"This is my comment"');
    });

    it('Verify the "Show Translation" feature in the contribution tab by using accents in the Post title', async () => {
        await verifyShowTranslationFeatureForTitle('Thís ís thë títlé óf my póst', 'This is the title of my post');
    });
    it('Verify the "Show Translation" feature in the contribution tab by using accents in the Post content', async () => {
        await verifyShowTranslationFeatureForDiscription('Thís ís thé déscríptíon óf my póst', 'This is the description of my post');
    });
    it('Verify the "Show Translation" feature in the contribution tab by using accents in the Post comment', async () => {
        await verifyShowTranslationFeatureForComment('Thís ís my cómmént', 'This is my comment');
    });
})