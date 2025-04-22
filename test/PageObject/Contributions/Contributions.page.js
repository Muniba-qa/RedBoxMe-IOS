const ContributionPage = require('../Contributions/Contributions.locator.js');
const { commentText } = require('../Thoughts/Thoughts.locator.js');
const  allure = require("@wdio/allure-reporter").default;


const createContribution = async (title, description) => {

    allure.addStep("Click on the + button from the bottom to create contribution");
    await $(ContributionPage.createContributionBtn).waitForDisplayed();
    await $(ContributionPage.createContributionBtn).click();

    allure.addStep("Click on the Share Your Contribution Button");
    await $(ContributionPage.shareYourContributionBtn).waitForDisplayed();
    await $(ContributionPage.shareYourContributionBtn).click();

    allure.addStep(`Enter ${title} text in the contribution title field`);
    await $(ContributionPage.contributionTitleField).waitForDisplayed();
    await $(ContributionPage.contributionTitleField).clearValue();
    await $(ContributionPage.contributionTitleField).setValue(title);

    allure.addStep(`Enter ${description} text in the contribution description field`);
    await $(ContributionPage.contributionDescriptionField).waitForDisplayed();
    await $(ContributionPage.contributionDescriptionField).clearValue();
    await $(ContributionPage.contributionDescriptionField).setValue(description);
    
    allure.addStep("Click on the Next Contribution Button");
    await $(ContributionPage.contributionNextBtn).waitForDisplayed();
    await $(ContributionPage.contributionNextBtn).click();

    allure.addStep("Click on the Art and Entertainment Option");
    await $(ContributionPage.artAndEntertainmentOption).waitForDisplayed();
    await $(ContributionPage.artAndEntertainmentOption).click();

    allure.addStep("Click on the Share button from the bottom");
    await $(ContributionPage.shareBottomBtn).waitForDisplayed();
    await $(ContributionPage.shareBottomBtn).click();
    

}

const deleteContribution = async () => {

    await browser.pause(3000);

    allure.addStep("Click on the Three Dot button of the contribution");
    await $(ContributionPage.contributionThreeDotBtn).waitForDisplayed();
    await $(ContributionPage.contributionThreeDotBtn).click();

    allure.addStep('Click on the Delete contribution Button');
    await $(ContributionPage.deleteContributionBtn).waitForDisplayed();
    await $(ContributionPage.deleteContributionBtn).click();
    
    allure.addStep('Click on the Delete Content contribution Button');
    await $(ContributionPage.deleteContentBtn).waitForDisplayed();
    await $(ContributionPage.deleteContentBtn).click();
    
    
}

const verifyShowTranslationFeatureForTitle = async (Title, OriginalTitle) => {

    await createContribution(Title, 'This is my Post Description');

    await browser.pause(3000);

    allure.addStep('Click on the show Translation contribution Button');
    await $(ContributionPage.showTranslationBtn).waitForDisplayed();
    await $(ContributionPage.showTranslationBtn).click();

    await browser.pause(3000);

    allure.addStep("verify contribution post title correctly translated");
    let postTitleText = await $(ContributionPage.postOriginalText).getText();
    await expect(postTitleText).toEqual(OriginalTitle);

    await deleteContribution();
}

const verifyShowTranslationFeatureForDiscription = async (Description, OriginalDescription) => {

    await createContribution('This is my Post Title', Description);

    await browser.pause(3000);

    allure.addStep('Click on the show Translation contribution Button');
    await $(ContributionPage.showTranslationBtn).waitForDisplayed();
    await $(ContributionPage.showTranslationBtn).click();

    await browser.pause(3000);

    allure.addStep("verify contribution post description correctly translated");
    let postDescriptionText = await $(ContributionPage.postOriginalDesc).getText();
    await expect(postDescriptionText).toContain(OriginalDescription);

    await deleteContribution();

}

const verifyShowTranslationFeatureForComment = async (CommentedText, OriginalCommentText) => {

    await createContribution('This is my Post Title', 'Esta es la descripción de mi publicación');

    await browser.pause(3000);

    allure.addStep('Click on the Post Description');
    await $(ContributionPage.postOriginalDesc).waitForDisplayed();
    await $(ContributionPage.postOriginalDesc).click({force: true});

    await browser.pause(3000);

    allure.addStep('Click on the Share Your Reflection Field');
    await $(ContributionPage.shareYourReflectionField).waitForDisplayed();
    await $(ContributionPage.shareYourReflectionField).click();

    allure.addStep(`Enter ${CommentedText} text in the contribution comment field`);
    await $(ContributionPage.addYourReflectionField).waitForDisplayed();
    await $(ContributionPage.addYourReflectionField).clearValue();
    await $(ContributionPage.addYourReflectionField).setValue(CommentedText);

    allure.addStep('Click on the send button of the comment');
    await $(ContributionPage.commentSendBtn).waitForDisplayed();
    await $(ContributionPage.commentSendBtn).click();

    await browser.pause(3000);

    allure.addStep('Click on the show Translation button of the comment');
    await $(ContributionPage.showTranslationBtn).waitForDisplayed();
    await $(ContributionPage.showTranslationBtn).click();

    await browser.pause(3000);

    allure.addStep('Verify that comment text successfully translated');
    let commentTex = await $(ContributionPage.commentText).getText();
    await expect(commentTex).toEqual(OriginalCommentText);

    allure.addStep('Click on the Three Dot button of the comment');
    await $(ContributionPage.commentThreeDotBtn).waitForDisplayed();
    await $(ContributionPage.commentThreeDotBtn).click();

    allure.addStep('Click on the Delete contribution comment Button');
    await $(ContributionPage.deleteContributionBtn).waitForDisplayed();
    await $(ContributionPage.deleteContributionBtn).click();

    allure.addStep('Click on the Cross button of contribution comment');
    await $(ContributionPage.commentCrossBtn).waitForDisplayed();
    await $(ContributionPage.commentCrossBtn).click();

    await deleteContribution();

}

const verifyShowTranslationFeatureInDeviceLanguage = async (Title, showTranslationText, showOriginalText, ) => {

    await createContribution(Title, 'This is my Post Description');

    await browser.pause(3000);

    allure.addStep('Click on the show Translation contribution Button');
    await $(ContributionPage.showTranslationBtn).waitForDisplayed();
    await $(ContributionPage.showTranslationBtn).click();

    await browser.pause(3000);

    allure.addStep("verify contribution post title correctly translated");
    let postTitleText = await $(ContributionPage.postOriginalText).getText();
    await expect(postTitleText).toEqual(OriginalTitle);

    await deleteContribution();

}
module.exports = {
    verifyShowTranslationFeatureForTitle,
    verifyShowTranslationFeatureForDiscription,
    verifyShowTranslationFeatureForComment
}