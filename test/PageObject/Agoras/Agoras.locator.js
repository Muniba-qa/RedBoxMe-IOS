
const AgorasPage = {

    agorasTabBtn: '//XCUIElementTypeButton[@name="Agoras"]',
    agorasShowTranslationBtn: "//XCUIElementTypeOther[@name='translation-button']",
    agorasPostTitle: '(//XCUIElementTypeOther[@name="translation-button"]/preceding-sibling::XCUIElementTypeOther)[3]',
    agorasPostShortDesc: '(//XCUIElementTypeOther[@name="translation-button"]/preceding-sibling::XCUIElementTypeOther)[4]',
    agorasSeeMoreBtn: '(//XCUIElementTypeOther[@name="See more "])[2]',
    
}

module.exports = AgorasPage;