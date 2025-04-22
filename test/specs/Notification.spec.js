const {
    Login,
    Logout
} = require('../PageObject/Login/Login.page.js');
const {
    verifyNotificationBenchMarkingLoadingTime,
    verifyNotificationExpectedLoadingTime,
    verifyNotificationConsistencyLoadTime,
    verifyNotificationPageItemVisiblity
} = require("../PageObject/Notification/Notification.page.js")

describe('Notification Tab', async () => {

    beforeEach(async () => {
        await Login();
    });

    afterEach(async () => {
        await Logout();
        await browser.reloadSession();
    });

    it('TC-001 : Benchmarking - Verify Slow Loading Behavior of Notifications Page', async () => {
        await verifyNotificationBenchMarkingLoadingTime(process.env.PRODUCTION_NOTIFICATION_ENDPOINT, process.env.PRODUCTION_ACCESS_TOKEN);
    });
    it('TC-002 : Verify notifications load within expected time', async () => {
        await verifyNotificationExpectedLoadingTime();
    });
    it.only('TC-003 : Verify Consistent Loading Times for Notifications (1-2 seconds)', async () => {
        await verifyNotificationConsistencyLoadTime();
    });
    it.only('TC-004 : Benchmarking - Verify all items of the Notification page present and correctly loading in both builds', async () => {
        await verifyNotificationPageItemVisiblity(process.env.STAGING_NOTIFICATION_ENDPOINT, process.env.STAGING_ACCESS_TOKEN, process.env.PRODUCTION_NOTIFICATION_ENDPOINT, process.env.PRODUCTION_ACCESS_TOKEN);
    })
})