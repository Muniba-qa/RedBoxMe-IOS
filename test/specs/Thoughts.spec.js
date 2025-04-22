const { 
    Login,
    Logout
} = require('../PageObject/Login/Login.page.js');

const {
    showTranslationFeatureInThoughtsTitle,
    showTranslationFeatureInThoughtComment,
    verifyShowTranslationFeatureThroughDeviceLanguage,
} = require('../PageObject/Thoughts/Thoughts.page.js');

describe('Thoughts Tab', () => {
    
    // Runs before each test to ensure a fresh login session
    beforeEach(async () => {
        await Login();
    });

    // Runs after each test to logout and reset the session
    afterEach(async () => {
        await Logout();
        await browser.reloadSession();
    });

    // RD-2848: Verify that the "Show Translation" feature works in the post title
    it.only('RD-2848_Verify that the "Show Translation" feature works in the title section of the Thoughts tab post.', async () => {
        await showTranslationFeatureInThoughtsTitle('Este es mi post.', 'This is my post.');
    });

    // RD-2849: Verify "Show Translation" feature works in comments
    it.only('RD-2849_Verify that the "Show Translation" feature works in the comments section of the Thoughts tab post.', async () => {
        await showTranslationFeatureInThoughtComment('Este es mi post', 'Este es mi commentario', 'This is my comment');
    });

    // RD-2850: Verify translation when the post contains **cedilla (ê, è)**
    it.only('RD-2850_Verify the "Show Translation" feature in the Post When we use cedilla in the post', async () => {
        await showTranslationFeatureInThoughtsTitle('Estê ès mi post', 'This is my post');
    });

    // RD-2851: Verify translation when **comments contain cedilla**
    it('RD-2851_Verify the "Show Translation" feature in the Post When we use cedilla in the comments', async () => {
        await showTranslationFeatureInThoughtComment('Este es mi post', 'Estê ès mi comêntário', 'This is my comment');
    });

    // RD-2852: Verify translation when the post contains **accented characters**
    it('RD-2852_Verify the "Show Translation" feature in the Post When we use accents in the post', async () => {
        await showTranslationFeatureInThoughtsTitle('Thís ís my póst', 'This is my post');
    });

    // RD-2853: Verify translation when **comments contain accented characters**
    it('RD-2853_Verify the "Show Translation" feature in the Post When we use accents in the comments of the post', async () => {
        await showTranslationFeatureInThoughtComment('Este es mi post', 'Thís ís my cómment', 'This is my comment');
    });

    // RD-2854: Verify translation when the post contains **quotes ("...")**
    it('RD-2854_Verify the "Show Translation" feature in the Post When we use quotes in the post', async () => {
        await showTranslationFeatureInThoughtsTitle('"Este es mi post"', 'This is my post');
    });

    // RD-2855: Verify translation when **comments contain quotes**
    it('RD-2855_Verify the "Show Translation" feature in the Post When we use quotes in the comments', async () => {
        await showTranslationFeatureInThoughtComment('Este es mi post', '"Estê ès mi comêntário"', 'This is my comment');
    });

    // RD-2856: Verify translation when the **device language is switched to French**
    it('RD-2856_Verify the "Show Translation" feature in the thoughts tab through change the device language to French', async () => {
        await verifyShowTranslationFeatureThroughDeviceLanguage(
          "This is my post",  // Original Text
          "Afficher la traduction", // "Show Translation" in French
          "Afficher l'original", // "Show Original" in French
          "Ceci est mon message" // Translated Post
        );
    });

    // RD-2857: Verify translation when the **device language is switched to Japanese**
    it('RD-2857_Verify the "Show Translation" feature in the thoughts tab through changing the device language to Japanese', async () => {
        await verifyShowTranslationFeatureThroughDeviceLanguage(
          "This is my post",
          "翻訳を表示", // "Show Translation" in Japanese
          "オリジナルを表示", // "Show Original" in Japanese
          "これは私の投稿です" // Translated Post
        );
    });

    // RD-2858: Verify translation when the **device language is switched to German**
    it('RD-2858_Verify the "Show Translation" feature in the thoughts tab through changing the device language to German', async () => {
        await verifyShowTranslationFeatureThroughDeviceLanguage(
          "This is my post",
          "Übersetzung anzeigen", // "Show Translation" in German
          "Original anzeigen", // "Show Original" in German
          "Das ist mein Beitrag" // Translated Post
        );
    });

});
