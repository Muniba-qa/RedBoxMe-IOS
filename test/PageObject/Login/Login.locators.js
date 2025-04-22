const LoginPage = {
    iAmAMemberBtn: '//XCUIElementTypeOther[@label="I AM A MEMBER"]',
    loginEmailField: '//XCUIElementTypeTextField[@name="login-email-input"]',
    sendCodeBtn: '//XCUIElementTypeOther[@name="login-send-code-button"]',
    otpInput1: '(//XCUIElementTypeTextField[@value="*"])[1]',
    submitVerificationCodeBtn: '//XCUIElementTypeOther[@name="button-press"]',
    plusBtn: '//XCUIElementTypeOther[@name="empty3"]/XCUIElementTypeButton',
    menuBtn: '//XCUIElementTypeOther[@name="menu-button"]',
    dashboardBtn: '(//XCUIElementTypeOther[@name="item-list"])[1]',
    logoutBtn: '//XCUIElementTypeOther[@label="LOG OUT"]/XCUIElementTypeOther',
    popupLogoutBtn: '//XCUIElementTypeButton[@name="Log out"]',
    
} 

module.exports = LoginPage;