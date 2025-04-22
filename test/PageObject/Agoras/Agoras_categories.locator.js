
class AgorasPage {

    get agorasTabBtn() {
        return '//android.widget.Button[@content-desc="Agoras"]'
    }
    get previousNavBtn() {
        return '//android.widget.TextView[contains(@text, "Past")]'
    }
    get thisWeekNavBtn() {
        return '//android.widget.TextView[@text= "Within 7 days"]'
    }

    get thisWeekNavBtnSelected() {
        return '//android.view.View[@content-desc="Within 7 days"]'
    }

    get thisWeekPost() {
        return '(//android.view.ViewGroup[contains(@content-desc, "youtu.be")]/following-sibling::android.view.ViewGroup)[1]'
    }

    get getAgoraDateTime(){
        return '(//android.widget.TextView[contains(@resource-id, "title-container")])[2]/following-sibling::android.widget.TextView[1]';
    }

    get upcomingNavBtn() {
        return '//android.widget.TextView[@text= "Beyond 7 days"]'
    }

    get attendanceConfirmedBtn() {
        return '//android.widget.TextView[@text = "ATTENDANCE CONFIRMED"]'
    }

    get participateBtn() {
        return '//android.widget.TextView[@text= "PARTICIPATE"]'
    }

    get notNowBtn() {
        return '//android.widget.TextView[@text= "NOT NOW"]'
    }
    get closeBtn() {
        return '(//android.view.ViewGroup[@resource-id="back-button"])[1]'
    }

    get postParent() {
        return '//android.view.ViewGroup/android.widget.ScrollView'
    }
    get shareYourCommentButton() {
        return '//android.widget.TextView[@text = "Share your contribution..."]'
    }
    get enterComment() {
        return '//android.widget.EditText[@text = "Add your contribution..."]'
    }

    get sendCommentButton() {
        return '(//android.view.ViewGroup[@resource-id="avatar-touchable"]/following-sibling::android.widget.EditText/following-sibling::android.view.ViewGroup)[1]'
    }
    
    get checkCommentExist() {
        return '//android.widget.TextView[@text = "Muniba Iqbal"]'
    }

    get voteButton() {
        return '(//android.widget.TextView[@text = "Muniba Iqbal"]/parent::android.view.ViewGroup/following-sibling::android.view.ViewGroup/com.horcrux.svg.SvgView)[1]'
    }

    get voteCount() {
        return '(//android.widget.TextView[@text = "Muniba Iqbal"]/parent::android.view.ViewGroup/following-sibling::android.view.ViewGroup/android.widget.TextView)[1]'
    }

    get replyButton() {
        return '(//android.widget.TextView[@text = "Muniba Iqbal"]/parent::android.view.ViewGroup/following-sibling::android.view.ViewGroup/com.horcrux.svg.SvgView)[2]'
    }

    get replyComment() {
        return '//android.widget.EditText[@text = "Answer in this thread"]'
    }

    get checkReplyExist() {
        return '(//android.widget.TextView[@text = "Muniba Iqbal"])[2]'
    }

    get moreOptionBtn() {
        return '(//android.view.ViewGroup[@resource-id="avatar-touchable"]/following-sibling::android.view.ViewGroup)[1]/android.view.ViewGroup'
    }

    get editCommentBtn() {
        return '//android.view.ViewGroup[@content-desc="Edit"]'
    }

    get deleteCommentBtn() {
        return '//android.view.ViewGroup[@content-desc="Delete"]'
    }
    get closeShareContribution() {
        return '//android.widget.TextView[@text="Remember to keep the conversation respectful and to follow our Community Guidelines"]/following-sibling::android.view.ViewGroup'
    }

    get postShareContribution() {
        return '//android.widget.TextView[@text="Remember to keep the conversation respectful and to follow our Community Guidelines"]/following-sibling::android.view.ViewGroup'
    }

    get pastVideoPlayer(){
        return '//android.view.View[@resource-id="movie_player"]'
    }

    get pastPost(){
        return '//android.view.ViewGroup[@content-desc="Testing Agora Past Concluded event title"]'
    }
    get getAgoraDateTimePastPost(){
        return '(//android.widget.TextView[contains(@resource-id, "title-container")])[2]/following-sibling::android.widget.TextView[2]';
    }
}   

module.exports = AgorasPage;