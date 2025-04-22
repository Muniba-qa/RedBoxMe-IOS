const NotificationPage = require('../Notification/Notification.locator.js');
const allure = require('@wdio/allure-reporter').default;
const axios = require('axios');

const measureLoadTime = async (actionDescription, action, verificationCondition, apiUrl = null, accessToken = null) => {
    allure.addStep(actionDescription);
    await action();

    let startTime = Date.now();
    allure.addStep('Wait until content of the notification fully loaded');
    await $(NotificationPage.notificationContent).waitForDisplayed();
    let endTime = Date.now();

    let loadTime = (endTime - startTime) / 1000;
    allure.addStep(`Notification Screen Loaded in ${loadTime} seconds`);
    allure.addAttachment("Notification Screen Load Time", `${loadTime} sec`, "text/plain");

    allure.addStep(`Verify that Notification Screen is ${verificationCondition ? 'not ' : ''}more than 2 seconds`);
    await expect(loadTime)[verificationCondition ? 'toBeLessThan' : 'toBeGreaterThan'](2);

    if (apiUrl) {
        allure.addStep(`Measuring API response time for ${apiUrl}`);
        let apiStartTime = Date.now();

        try {
            let response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            let apiEndTime = Date.now();
            let apiLoadTime = (apiEndTime - apiStartTime) / 1000;
            allure.addStep(`API responded in ${apiLoadTime} seconds`);
            allure.addAttachment("API Response Time", `${apiLoadTime} sec`, "text/plain");

            allure.addStep("Verify that API response time is more than 2 seconds");
            await expect(apiLoadTime).toBeGreaterThan(2);

            allure.addStep("Verify the API Response status is equal to 200");
            await expect(response.status).toEqual(200);
        } catch (error) {
            allure.addStep(`API request failed: ${error.message}`);
            throw error;
        }
    }
};


const verifyNotificationBenchMarkingLoadingTime = async (apiUrl, accessToken) => {
    await measureLoadTime('Click on the Notification icon from the bottom menu',
        async () => {
            await $(NotificationPage.notificationBtn).waitForDisplayed();
            await $(NotificationPage.notificationBtn).click();
        },
        false,
        apiUrl,
        accessToken
    );
};

const verifyNotificationExpectedLoadingTime = async () => {
    await measureLoadTime('Click on the Notification icon from the bottom menu',
        async () => {
            await $(NotificationPage.notificationBtn).waitForDisplayed();
            await $(NotificationPage.notificationBtn).click();
        },
        true
    );
};

const navigationSequence = async (button) => {
    allure.addStep(`Click on ${button} from the bottom menu`);
    await $(NotificationPage[button]).waitForDisplayed();
    await $(NotificationPage[button]).click();
};

const verifyNotificationConsistencyLoadTime = async () => {

    await navigationSequence('myCommunityRouterBtn');
    await browser.pause(3000);
    await measureLoadTime('Click on the Notification icon from the bottom menu', () => navigationSequence('notificationBtn'), true);
    await navigationSequence('commingSoonRouterBtn');
    await navigationSequence('myCommunityRouterBtn');
    await browser.pause(3000);
    await measureLoadTime('Click on the Notification icon from the bottom menu', () => navigationSequence('notificationBtn'), true);
};

const verifyNotificationPageItemVisiblity = async ( productionApiUrl, accessTokenProduction) => {

    let stagingData;
    let productionData;
    await browser.pause(3000);
    await navigationSequence('notificationBtn');

    allure.addStep('Verify the Visibility of the top tab buttons');
    const elementsToCheck = [
        { locator: NotificationPage.whatsNewTabBtn, description: "What's New Tab" },
        { locator: NotificationPage.curatedForYouTabBtn, description: "Curated For You Tab" },
        { locator: NotificationPage.noticesTabBtn, description: "Notices Tab" }
    ];

    for (const element of elementsToCheck) {
        allure.addStep(`Verify ${element.description} is displayed`);
        await expect($(element.locator)).waitForDisplayed();
    }

    allure.addStep('Verify that the username and notification text are visible');
    await $(NotificationPage.notificationContent).waitForDisplayed();

    try {
        allure.addStep(`Measuring API response time for Staging: ${stagingApiUrl}`);
        let stagingStartTime = Date.now();

        let stagingResponse = await axios.get(stagingApiUrl, {
            headers: {
                Authorization: `Bearer ${accessTokenStaging}`
            }
        });

        let stagingEndTime = Date.now();
        let stagingApiLoadTime = (stagingEndTime - stagingStartTime) / 1000;
        allure.addStep(`Staging API responded in ${stagingApiLoadTime} seconds`);
        allure.addAttachment("Staging API Response Time", `${stagingApiLoadTime} sec`, "text/plain");

        allure.addStep("Verify that Staging API response time is less than 2 seconds");
        await expect(stagingApiLoadTime).toBeLessThan(2);

        allure.addStep("Verify the Staging API Response status is equal to 200");
        await expect(stagingResponse.status).toEqual(200);

        stagingData = stagingResponse.data;

        allure.addStep(`Measuring API response time for benchmarking build: ${productionApiUrl}`);
        let productionStartTime = Date.now();

        let productionResponse = await axios.get(productionApiUrl, {
            headers: {
                Authorization: `Bearer ${accessTokenProduction}`
            }
        });

        let productionEndTime = Date.now();
        let productionApiLoadTime = (productionEndTime - productionStartTime) / 1000;
        allure.addStep(`Benchmarking Build API responded in ${productionApiLoadTime} seconds`);
        allure.addAttachment("Benchmarking Build API Response Time", `${productionApiLoadTime} sec`, "text/plain");

        allure.addStep("Verify that Benchmarking Build API response time is more than 2 seconds");
        await expect(productionApiLoadTime).toBeGreaterThan(2);

        allure.addStep("Verify the Benchmarking Build API Response status is equal to 200");
        await expect(productionResponse.status).toEqual(200);

        productionData = productionResponse.data;

        // allure.addStep("Verify that the response data from benchmarking build and other build are the same");

        // await expect(stagingData).toEqual(productionData); 

        // if (JSON.stringify(stagingData) !== JSON.stringify(productionData)) {
        //     allure.addStep("The response data between Staging and Benchmarking Build do not match.");
        // }

    } catch (error) {
        allure.addStep(`API request failed: ${error.message}`);
        throw error;
    }

}
module.exports = {
    verifyNotificationBenchMarkingLoadingTime,
    verifyNotificationExpectedLoadingTime,
    verifyNotificationConsistencyLoadTime,
    verifyNotificationPageItemVisiblity
};
