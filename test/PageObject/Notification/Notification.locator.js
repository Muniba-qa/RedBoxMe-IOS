
const NotificationPage = {

    notificationBtn: '//XCUIElementTypeOther[@name="notificationRouter"]/XCUIElementTypeButton',
    notificationContent: '(//XCUIElementTypeOther[@name="content-component"])[1]',
    myCommunityRouterBtn: '//XCUIElementTypeOther[@name="myCommunityRouter"]/XCUIElementTypeButton',
    commingSoonRouterBtn: '//XCUIElementTypeOther[@name="comingSoonRouter"]/XCUIElementTypeButton',
    whatsNewTabBtn: `//XCUIElementTypeOther[@name="tab-item" and @label="What's new"]`,
    curatedForYouTabBtn: '//XCUIElementTypeOther[@name="tab-item" and @label="Curated for you"]',
    noticesTabBtn: '//XCUIElementTypeOther[@name="tab-item" and @label="Notices"]'

}

module.exports = NotificationPage;