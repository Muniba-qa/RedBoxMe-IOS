const ThoughtPage = require('../Thoughts/Thoughts.locator.js');
const allure = require("@wdio/allure-reporter").default;

const createThoughtPost = async (postTitle) => {
    await browser.pause(3000);

    allure.addStep("Click on the menu profile button");
    await $(ThoughtPage.profileIcon).waitForDisplayed();
    await $(ThoughtPage.profileIcon).click();

    allure.addStep("Click on the Thought tab button");
    await $(ThoughtPage.thoughtTabBtn).waitForDisplayed();
    await $(ThoughtPage.thoughtTabBtn).click();

    await browser.pause(5000);

    allure.addStep("Click on the Share your thoughts field");
    await $(ThoughtPage.shareYourThoughtField).waitForDisplayed();
    await $(ThoughtPage.shareYourThoughtField).click({ timeout: 30000, reverse: false });

    allure.addStep(`Enter ${postTitle} text in the share thought field`);
    await $(ThoughtPage.shareYourThoughtEditField).waitForDisplayed();
    await $(ThoughtPage.shareYourThoughtEditField).clearValue();
    await $(ThoughtPage.shareYourThoughtEditField).setValue(postTitle);

    allure.addStep("click on the share button of the post");
    await $(ThoughtPage.shareBtn).waitForDisplayed();
    await $(ThoughtPage.shareBtn).click();

    await browser.pause(3000);

}

const deleteThoughts = async () => {

    await browser.pause(3000);

    allure.addStep("click on the post title");
    await $(ThoughtPage.postTitleText).waitForDisplayed();
    await $(ThoughtPage.postTitleText).click({ force: true });

    allure.addStep("click on the post Three dot button");
    await $(ThoughtPage.postThreeDotBtn).waitForDisplayed();
    await $(ThoughtPage.postThreeDotBtn).click();

    allure.addStep("click on the post DELETE button");
    await $(ThoughtPage.postDeleteBtn).waitForDisplayed();
    await $(ThoughtPage.postDeleteBtn).click();

    allure.addStep("click on the post DELETE THOUGHT button");
    await $(ThoughtPage.deleteThoughtBtn).waitForDisplayed();
    await $(ThoughtPage.deleteThoughtBtn).click();


}

const showTranslationFeatureInThoughtsTitle = async (postTitle, translateText) => {

    await createThoughtPost(postTitle);

    await browser.pause(5000);

    allure.addStep("click on the show translation button of the newly created post");
    await $(ThoughtPage.showTranslationBtn).waitForDisplayed();
    await $(ThoughtPage.showTranslationBtn).click();
    
    await browser.pause(4000);

    allure.addStep("verify that the post text translated correctly");
    await $(ThoughtPage.postTitleText).waitForDisplayed();
    let translatedText = await $(ThoughtPage.postTitleText).getText();
    await Expectation(translatedText).toEqual(translateText);

    await deleteThoughts();

}

const showTranslationFeatureInThoughtComment = async (postTitle, commentText, originalComment) => {

    await createThoughtPost(postTitle);

    await browser.pause(5000);

    allure.addStep("Click on the comment button of the newly created thought post");
    await $(ThoughtPage.commentBtn).waitForDisplayed();
    await $(ThoughtPage.commentBtn).click();

    allure.addStep(`Enter ${commentText} in the comment field`);
    await $(ThoughtPage.addYourReflectionField).waitForDisplayed();
    await $(ThoughtPage.addYourReflectionField).clearValue();
    await $(ThoughtPage.addYourReflectionField).setValue(commentText);

    allure.addStep("Click on the Send button of the comment");
    await $(ThoughtPage.commentSendBtn).waitForDisplayed();
    await $(ThoughtPage.commentSendBtn).click();

    allure.addStep("click on the show translation button of the newly created post comment");
    await $(ThoughtPage.showTranslationBtn).waitForDisplayed();
    await $(ThoughtPage.showTranslationBtn).click();

    await browser.pause(3000);

    allure.addStep("verify that comment text translated correctly");
    let original = await $(ThoughtPage.commentText).getText();
    await expect(original).toEqual(originalComment);

    allure.addStep("click on the three dot button of the comment");
    await $(ThoughtPage.commentThreeDotBtn).waitForDisplayed();
    await $(ThoughtPage.commentThreeDotBtn).click();

    allure.addStep("click on the Delete button of the comment");
    await $(ThoughtPage.commentDeleteBtn).waitForDisplayed();
    await $(ThoughtPage.commentDeleteBtn).click();

    allure.addStep("click on the cross button of the comment");
    await $(ThoughtPage.commentCrossBtn).waitForDisplayed();
    await $(ThoughtPage.commentCrossBtn).click();

    await deleteThoughts();

}

const verifyShowTranslationFeatureThroughDeviceLanguage = async (postTitle, showTranslationText, showOriginalText, LanguagePostTitle) => {

    await createThoughtPost(postTitle);

    allure.addStep(`Click on the ${showTranslationText} link of the post`);
    await $(`(//XCUIElementTypeOther[@name="${showTranslationText}"])[1]`).waitForDisplayed();
    await $(`(//XCUIElementTypeOther[@name="${showTranslationText}"])[1]`).click();

    await browser.pause(3000);
    allure.addStep(`verify that ${postTitle} text is translated into ${LanguagePostTitle}`);
    const text = $(`(//XCUIElementTypeOther[@name="${showOriginalText}"]/preceding-sibling::XCUIElementTypeOther)[2]`).getText();
    await expect(text).toEqual(LanguagePostTitle);

    await deleteThoughts();

}

module.exports = {
    showTranslationFeatureInThoughtsTitle,
    showTranslationFeatureInThoughtComment,
    verifyShowTranslationFeatureThroughDeviceLanguage
}