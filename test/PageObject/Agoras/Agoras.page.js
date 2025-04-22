
const  AgorasPage = require('../Agoras/Agoras.locator.js');
const  allure = require("@wdio/allure-reporter").default;

const verifyAgorasPostTitle = async (OriginalText) => {

    allure.addStep('Click on the Agoras Tab button');
    await $(AgorasPage.agorasTabBtn).waitForDisplayed();
    await $(AgorasPage.agorasTabBtn).click();


    allure.addStep('Click on the Agoras show Translation button');
    await $(AgorasPage.agorasShowTranslationBtn).waitForDisplayed();
    await $(AgorasPage.agorasShowTranslationBtn).click();

    await browser.pause(3000);

    allure.addStep('verify Agoras post title translated correctly');
    let text = await $(AgorasPage.agorasPostTitle).getText();
    await expect(text).toEqual(OriginalText);

    await browser.pause(3000);

}

const verifyAgorasPostShortDescription = async (DescriptionText) => {
    allure.addStep('Click on the Agoras Tab button');
    await $(AgorasPage.agorasTabBtn).waitForDisplayed();
    await $(AgorasPage.agorasTabBtn).click();


    allure.addStep('Click on the Agoras show Translation button');
    await $(AgorasPage.agorasShowTranslationBtn).waitForDisplayed();
    await $(AgorasPage.agorasShowTranslationBtn).click();

    await browser.pause(3000);

    allure.addStep('verify Agoras post Description translated correctly');
    let text = await $(AgorasPage.agorasPostShortDesc).getText();
    await expect(text).toEqual(DescriptionText);

    await browser.pause(3000);

}

const verifyAgorasPostDetailDescription = async () => {

    allure.addStep('Click on the Agoras Tab button');
    await $(AgorasPage.agorasTabBtn).waitForDisplayed();
    await $(AgorasPage.agorasTabBtn).click();

    await browser.pause(3000);

    allure.addStep('Click on the Agoras See More button button');
    await $(AgorasPage.agorasSeeMoreBtn).waitForDisplayed();
    await $(AgorasPage.agorasSeeMoreBtn).click();

    allure.addStep('Click on the Agoras show Translation button');
    await $(AgorasPage.agorasShowTranslationBtn).waitForDisplayed();
    await $(AgorasPage.agorasShowTranslationBtn).click();

    

}

module.exports = {
    verifyAgorasPostTitle,
    verifyAgorasPostShortDescription
}