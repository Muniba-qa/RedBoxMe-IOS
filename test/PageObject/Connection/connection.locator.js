
const ConnectionPage = {
    profileBtn: '//XCUIElementTypeOther[@name="userProfileRouter"]/XCUIElementTypeButton',
    connectionTabParent: '(//XCUIElementTypeOther[@name="Thoughts Contributions Confirmed About Connections Vertical scroll bar, 2 pages"])[2]/XCUIElementTypeScrollView',
    connectionTabBtn: '//XCUIElementTypeOther[@name="tab-item" and @label="Connections"]',
    inprogressIcon: '//XCUIElementTypeActivityIndicator[@name="In progress"]',
    connectionScrollParent: '(//XCUIElementTypeOther[contains(@name, "Search connections")])/XCUIElementTypeScrollView',
    menuBtn: '//XCUIElementTypeOther[@name="menu-button"]',
    topAccountName: '//XCUIElementTypeOther[@name="menu-button"]/following-sibling::XCUIElementTypeStaticText',
    contributionTabBtn:  '//XCUIElementTypeOther[@name="tab-item" and @label="Contributions"]',
    confirmTabBtn: '//XCUIElementTypeOther[@name="tab-item" and @label="Confirmed"]',
    aboutTabBtn: '//XCUIElementTypeOther[@name="tab-item" and @label="About"]',
    searchConnectionBtn: '(//XCUIElementTypeOther[contains(@name, "Search connections")])[2]',
    // searchConnectionBtn: '//XCUIElementTypeOther[@name="My groups"]/parent::XCUIElementTypeOther/preceding-sibling::XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther',
    connectionListItemsFirst: '((//XCUIElementTypeOther[@name="My connections"])[1]/parent::XCUIElementTypeOther)/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[@name= "avatar-touchable"][1]',
    searchLoader: '//XCUIElementTypeOther[@name="loading-backdrop"]',
    myGroupsText: '//XCUIElementTypeOther[@name="My groups"]',
    // groupsParent: '(//XCUIElementTypeOther[@name="My groups"]/following-sibling::XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeOther//XCUIElementTypeOther/XCUIElementTypeOther[@name="avatar-touchable"])[1]',
    

    groupsParent: '(//XCUIElementTypeOther[contains(@name, "My groups Group")]//XCUIElementTypeOther[contains(@name, "Group")]//XCUIElementTypeScrollView)[3]//XCUIElementTypeOther[contains(@name, "Group")]//XCUIElementTypeOther//XCUIElementTypeOther//XCUIElementTypeOther',
    connectionParent: '(//XCUIElementTypeScrollView)[2]',
    connectionBuggy: '(//XCUIElementTypeOther[XCUIElementTypeOther[@name="My connections"]])[1]/following-sibling::XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther',
    myGroupText: '//XCUIElementTypeOther[@name="My groups"]',
    publicProfilesText: '//XCUIElementTypeOther[@name="Public profiles"]',
    // publicProfilesThumbnails: '(//XCUIElementTypeOther[@name="Public profiles"]/following-sibling::XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeOther//XCUIElementTypeOther/XCUIElementTypeOther[@name="avatar-touchable"])[1]',
    publicProfilesThumbnails: '//XCUIElementTypeOther[@name="Public profiles"]/following-sibling::XCUIElementTypeOther',
    

    connectionSearchedFirst: '(//XCUIElementTypeOther[@name="My connections"]/following-sibling::XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeOther)[1]',
    connectionFixed: '(//XCUIElementTypeStaticText[@name="My connections"])/ancestor::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther'

}

module.exports = ConnectionPage;