const ThoughtPage = {
    profileIcon: '//XCUIElementTypeOther[@name="userProfileRouter"]/XCUIElementTypeButton',
    thoughtTabBtn: '//XCUIElementTypeOther[@name="tab-item" and @label="Thoughts"]',
    shareYourThoughtField: '(//XCUIElementTypeOther[@name="Qa2 Share your thoughts Share "])[1]',
    shareYourThoughtShareBtn: '(//XCUIElementTypeOther[@name="Share "])[1]',
    shareYourThoughtEditField: '//XCUIElementTypeTextView[@name="Share your thoughts"]',
    shareBtn: '(//XCUIElementTypeOther[@name="Share "])[2]',
    showTranslationBtn: '(//XCUIElementTypeOther[@name="translation-button"])[1]',
    postTitleText: '(//XCUIElementTypeOther[@name="translation-button"]/preceding-sibling::XCUIElementTypeOther)[2]',
    postThreeDotBtn: '(//XCUIElementTypeOther[XCUIElementTypeOther[contains(@label, "translation-button")]])/preceding-sibling::XCUIElementTypeOther/XCUIElementTypeOther[3]',
    postDeleteBtn: '(//XCUIElementTypeOther[@name="Delete"])[2]',
    deleteThoughtBtn: '//XCUIElementTypeOther[@name="button-press" and @label="DELETE THOUGHT"]',
    commentBtn: '(//XCUIElementTypeOther[@name="translation-button"])[1]/following-sibling::XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]',
    addYourReflectionField: '//XCUIElementTypeTextView[@name="Add your reflection…"]',
    commentSendBtn: '(//XCUIElementTypeOther[@name="Horizontal scroll bar, 1 page"])[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther',
    commentText: "(//XCUIElementTypeOther[@name='translation-button'])[1]/preceding-sibling::XCUIElementTypeStaticText",
    commentThreeDotBtn: '//XCUIElementTypeOther[@name="translation-button"]/preceding-sibling::XCUIElementTypeOther/XCUIElementTypeOther[2]',
    commentDeleteBtn: '(//XCUIElementTypeOther[@name="Delete"])[2]',
    commentCrossBtn: '//XCUIElementTypeOther[@name=""]',

}

module.exports = ThoughtPage;