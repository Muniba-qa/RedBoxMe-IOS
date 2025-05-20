class SearchLocators {
    get searchIcon() {
      return '//XCUIElementTypeOther[@name=""]'
    }
  
    get searchInput() {
      return "//XCUIElementTypeOther[@name='What are you looking for?']";
    }
  
    get artificialIntelligenceTxt() {
      return '//XCUIElementTypeOther[@name="search-record-11161"]'
    }
  
    get equityInArtificialIntelligenceTxt() {
      return '//XCUIElementTypeStaticText[@name="AI as a Tool, Not a Decision-Maker: Why Humans Must Stay in the Loop"]'
    }
  
    get noResultFoundForTxt() {
      return '//XCUIElementTypeStaticText[contains(@label, "No results found for")]';
    }

    get searchKeyboardButoon(){
      return '//XCUIElementTypeButton[@name="Search"]';
    }
  
    get suggestItAsATopicTxt() {
      return '//XCUIElementTypeStaticText[@name="suggest-topic-link"]'
    }
  
    get searchInputText() {
      return "//android.widget.EditText[@text= 'What are you looking for?']/preceding-sibling::android.widget.TextView";
    }
  
    get filterBtn() {
      return '(//XCUIElementTypeOther[@name=""])[2]'
    }
  
    get closeFilterIcon(){
      return '//XCUIElementTypeOther[@name=""]'
    }
  
    get thoughtsAccordian() {
      return '(//XCUIElementTypeOther[@name="Thoughts "])[1]'
    }
  
    get contributionsAccordian() {
      return '(//XCUIElementTypeOther[@name="Contributions "])[1]'
    }
  
    get agorasAccordian() {
      return '(//XCUIElementTypeOther[@name="Agoras "])[1]'
    }
  
    get membersAccordian() {
      return '(//XCUIElementTypeOther[@name="Member Profiles "])[1]'
    }
  
    get clearAllBtn() {
      return '//XCUIElementTypeOther[@name="Clear All"]'
    }
  
    get postedByMeOpt() {
      return '(//XCUIElementTypeOther[@name="Posted by Me"])[2]'
    }
  
    get withInSevenDays() {
      return '(//XCUIElementTypeOther[@name="Within 7 Days"])[2]'
    }
  
    get selectedWithInSevenDays() {
      return '(//XCUIElementTypeOther[@name="Agoras Within 7 Days "])[1]'
    }
  
    get beyondSevenDays() {
      return '(//XCUIElementTypeOther[@name="Beyond 7 Days"])[2]'
    }
  
    get contributionsAllOpt() {
      return '//android.view.ViewGroup[@content-desc="Contributions, All, "]/android.widget.TextView[2]'
    }
    
    get contributionsAllSelected() {
      return '//android.view.ViewGroup[@content-desc="Contributions, All, "]'
    }
        
    get thoughtsAllOpt() {
      return '//android.view.ViewGroup[@content-desc="Thoughts, All, "]/android.widget.TextView[2]'
    }
  
    get allCheck() {
      return '(//XCUIElementTypeOther[@name="All"])[2]'
    }
  
    get showResultsBtn() {
      return '//XCUIElementTypeOther[contains(@name, "Thoughts") and contains(@name, "Agoras") and contains(@name, "Contributions") and contains(@name, "Member Profiles")]/following-sibling::XCUIElementTypeOther[contains(@name, "SHOW")]'
    }
  
    get showResultBtnText(){
      return '//android.widget.TextView[contains(@text, "SHOW RESULTS")]'
    }
  
    get searchInputField() {
      return 'android.widget.EditText'
    }
  
    get searchBackBtn() {
      return "//android.view.ViewGroup[@content-desc='Menu']/preceding-sibling::android.view.ViewGroup"
    }
  
    get deleteIcon() {
      return '//android.view.ViewGroup[@content-desc=""]'
    }
  
    get recentSearchItems() {
      return '//android.view.ViewGroup[@content-desc]/android.widget.TextView[2]'
    }
  
    get searchResults() {
      return '//android.view.ViewGroup[@content-desc]/android.widget.TextView';
    }
  
    get selectedFilterTag1() {
      return '(//android.widget.HorizontalScrollView//android.widget.TextView)[1]'
    }
  
    get selectedFilterTagCrossIcon1() {
      return '(//android.widget.HorizontalScrollView//android.widget.TextView)[2]'
    }
  
    get selectedFilterTag2() {
      return '(//android.widget.HorizontalScrollView//android.widget.TextView)[3]'
    }
  
    get selectedFilterTagCrossIcon2() {
      return '(//android.widget.HorizontalScrollView//android.widget.TextView)[4]'
    }
  
    get postedByMe(){
      return '(//XCUIElementTypeOther[@name="Posted by Me"])[2]' 
    }
  
    get commentedByMe() {
      return '(//XCUIElementTypeOther[@name="Commented by Me"])[2]'
    }
  
    get contributionPostByMeCommentedByMeSelected() {
      return '//XCUIElementTypeOther[@name="filter-title-wrapper-contributions"]'
    }
  
    get past() {
      return '(//XCUIElementTypeOther[@name="Past"])[2]'
    }
  
    get withIn7Days() {
      return '(//XCUIElementTypeOther[@name="Within 7 Days"])[2]'
    }
  
    get beyond7Days() {
      return '(//XCUIElementTypeOther[@name="Beyond 7 Days"])[2]'
    }
  
    get luminarThinker() {
      return '(//XCUIElementTypeOther[@name="Luminary Thinkers"])[2]'
    }
  
    get redBoxConnection() {
      return '(//XCUIElementTypeOther[@name="RedBox Connections"])[2]'
    }
  
    get commonInterest() {
      return '(//XCUIElementTypeOther[@name="Common Interests"])[2]'
    }
  
    get allCheckBoxForSize (){
      return '//android.view.ViewGroup[@content-desc="All"]/android.view.ViewGroup'
    }
  
    get pastCheckBoxForSize (){
      return '//android.view.ViewGroup[@content-desc="Past"]/android.view.ViewGroup'
    }
    
    get contributionPost (){
      return '//android.widget.TextView[@text="Testing Contribution"]'
    }
  
    
    get noOtherPost(){
      return '//android.widget.TextView[@text="We’re thrilled to have you with"]'
    }
  
    get closeFilterOnTop1() {
      return '(//android.view.ViewGroup[@content-desc=""])[1]'
    }
    
    get closeFilterOnTop2() {
      return '(//android.view.ViewGroup[@content-desc=""])[2]'
    }
  
    get profileName() {
      return '//android.view.ViewGroup[@content-desc="Muniba, I will enjoy it"]'
    }
  
    get profilePicture() {
      return '//android.view.ViewGroup[@content-desc="Muniba, I will enjoy it"]/android.view.ViewGroup'
    }	
  
    get contributionPostSnippet (){
      return '//android.widget.TextView[@text="Android build, testing contribution"]'
    }
  
    get postImage() {
      return '//android.view.ViewGroup[@content-desc="RedBoxMe, “RED BOX” (v) the act of immersing in an experience that celebrates one’s uniqueness, unleashes their genius and connects it with others"]/following-sibling::android.view.ViewGroup'
    }
  
    get postLike(){
      return '(//android.view.ViewGroup[@content-desc="Android build, testing contribution"]/following-sibling::android.view.ViewGroup)[1]'
    }
  
    get scroll(){
      return '//android.view.ViewGroup/android.widget.ScrollView'
    }
  
    get seeMore(){
      return '//android.view.ViewGroup[@content-desc="See more, "]'
    }
  
    get fullPostTitle(){
      return '//android.widget.TextView[@text = "Loving the New Community Feed!"]'
    }
    
    get backButton(){
     return '//android.view.ViewGroup[@resource-id="back-button"]'
    }
  
  }
  
  module.exports = SearchLocators;
  