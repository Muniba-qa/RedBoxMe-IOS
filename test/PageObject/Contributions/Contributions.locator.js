
const ContributionPage = {
    
    createContributionBtn: '//XCUIElementTypeOther[@name="empty3"]/XCUIElementTypeButton',
    shareYourContributionBtn: '//XCUIElementTypeOther[@name="back-button" and @label="Share your Contribution Ask support, post an Op-Red or share your art "]',
    contributionTitleField: '//XCUIElementTypeOther[@name="Write a title for your content"]',
    contributionDescriptionField: '//XCUIElementTypeTextView[@name="Describe your Content"]',
    contributionNextBtn: '//XCUIElementTypeOther[@name="editing-control-next"]',
    artAndEntertainmentOption: '(//XCUIElementTypeOther[@name="chip"])[2]',
    shareBottomBtn: '(//XCUIElementTypeOther[@name="editing-control-next"])[2]',
    showTranslationBtn: '//XCUIElementTypeOther[@name="translation-button"]',
    postOriginalText: '//XCUIElementTypeOther[@name="translation-button"]/preceding-sibling::XCUIElementTypeOther/XCUIElementTypeStaticText[1]',
    contributionThreeDotBtn: '(//XCUIElementTypeOther[@name="translation-button"]/preceding-sibling::XCUIElementTypeOther)[1]/XCUIElementTypeOther[3]',
    deleteContributionBtn: '(//XCUIElementTypeOther[@name="Delete"])[2]',
    deleteContentBtn: '//XCUIElementTypeOther[@name="button-press" and @label="DELETE CONTENT"]',
    postOriginalDesc: '(//XCUIElementTypeOther[@name="translation-button"][1]/preceding-sibling::XCUIElementTypeOther)[2]',
    postCommentBtn: '(//XCUIElementTypeOther[@name="translation-button"][1]/following-sibling::XCUIElementTypeOther)[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]',
    shareYourReflectionField: '//XCUIElementTypeOther[@name="Share your reflections..."]',
    addYourReflectionField: '//XCUIElementTypeTextView[@name="Add your reflection…"]',
    commentSendBtn: '(//XCUIElementTypeOther[@name="Horizontal scroll bar, 1 page"])[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther',
    commentText: '//XCUIElementTypeOther[@name="translation-button"]/preceding-sibling::XCUIElementTypeStaticText',
    commentThreeDotBtn: '(//XCUIElementTypeOther[@name="translation-button"]/preceding-sibling::XCUIElementTypeOther/XCUIElementTypeOther)[2]',
    commentCrossBtn: '//XCUIElementTypeOther[@name=""]',
    

}

module.exports = ContributionPage;