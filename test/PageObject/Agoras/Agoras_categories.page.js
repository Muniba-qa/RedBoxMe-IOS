const { all } = require("axios");
const { scrollElementByXpath2 , scrollElementByXpathUp} = require("../../../Utils/myUtils.js");
const AgorasPage = require("./Agoras_categories.locator.js");
const allure = require('@wdio/allure-reporter');
const { scrollInsideElementDown, scrollInsideElementUp} = require('../../../Utils/myUtils.js');


const verifyAgorasCategories = async () => {

    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();

    await driver.pause(5000);

    allure.addStep('Verify the Agoras "Past" Tab is Displayed');
    const previous = await $(agorasPage.previousNavBtn);
    await expect(previous).toBeDisplayed(); 
    allure.addStep('Verified the Agoras "Past" Tab is Displayed');

    allure.addStep('Verify the Agoras "Within 7 day" Tab is Displayed');
    const thisWeek = await $(agorasPage.thisWeekNavBtn);
    await expect(thisWeek).toBeDisplayed();
    allure.addStep('Verified the Agoras "Within 7 day" Tab is Displayed');

    allure.addStep('Verify the Agoras "Beyond 7 days" Tab is Displayed');
    const upcoming = await $(agorasPage.upcomingNavBtn);
    await expect(upcoming).toBeDisplayed();
    allure.addStep('Verified the Agoras "Beyond 7 days" Tab is Displayed');
}

const verifyAgorasThisWeekActiveFirstTime = async () => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();

    await driver.pause(5000);

    allure.addStep('Verify the Agoras "Within 7 day" Tab is Selected');
    const thisWeek = await $(agorasPage.thisWeekNavBtnSelected);
    const thisWeekIsSelected = await thisWeek.getAttribute('selected');
    await expect(thisWeekIsSelected).toBe('true');
    allure.addStep('Verified the Agoras "Within 7 day" Tab is Selected');

}

const verifyAgorasThisWeekPost = async () => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();

    await driver.pause(5000);

    allure.addStep('Click on "Within 7 day"');
    await $(agorasPage.thisWeekNavBtnSelected).click();
    
    allure.addStep('Click on "Within 7 day" post');
    await $(agorasPage.thisWeekPost).click();
    await driver.pause(3000);

    allure.addStep('Get post date and time ');
    const postDateTime = await $(agorasPage.getAgoraDateTime).getText();

    // Remove the trailing timezone text like ' GMT' or ' gmt' or ' EDT/EST'
    const cleanedDateTime = postDateTime.replace(/\s[A-Za-z]+\/[A-Za-z_]+|GMT|gmt/g, '').trim();

    // Split into date and time parts, and rejoin for parsing
    const [datePart, timePart] = cleanedDateTime.split('|').map(part => part.trim());
    const fullDateTime = `${datePart} ${timePart}`;
    allure.addStep('Agora post date and time is: ' + fullDateTime);
    console.log('Agora post date and time is: ' + fullDateTime);

    // Parse Agora post date assuming it's already in NY time zone
    const parsedDate = new Date(fullDateTime);

    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);

    function formatDateOnly(date) {
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/New_York', // optional if you want NY time
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).formatToParts(date);

        const getPart = (type) => parts.find(p => p.type === type)?.value || '';

        return `${getPart('month')} ${getPart('day')}, ${getPart('year')}`;
    }

    const formattedNow = formatDateOnly(now);
    const formattedSevenDaysLater = formatDateOnly(sevenDaysLater);

    allure.addStep('Current Date: ' + formattedNow);
    allure.addStep('Date within 7 day limit: ' + formattedSevenDaysLater);

    const isWithin7Days = parsedDate >= now && parsedDate <= sevenDaysLater;
    await expect(isWithin7Days).toBe(true);

}

const verifyAgorasWithIn7DaysPostMoreThank2Hours = async () => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();

    await driver.pause(5000);

    allure.addStep('Click on "Within 7 day"');
    await $(agorasPage.thisWeekNavBtnSelected).click();
    
    allure.addStep('Click on "Within 7 day" post');
    await $(agorasPage.thisWeekPost).click();
    await driver.pause(3000);

    allure.addStep('Get post date and time ');
    const postDateTimeText = await $(agorasPage.getAgoraDateTime).getText();
    console.log('Post date and time text:', postDateTimeText);
    const cleanedText = postDateTimeText.trim();

    const timeMatch = cleanedText.match(/\d{1,2}:\d{2}\s?(AM|PM)/i);
    const timePart = timeMatch ? timeMatch[0] : null;

    const [month, day, year] = cleanedText.replace(timePart, '').trim().split(/\s+/);

    const datePart = `${month} ${day}, ${year} ${timePart}`;

    const nyPostTime = new Date(datePart);  

    function getCurrentNewYorkTime() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const parts = formatter.formatToParts(now);
    const get = (type) => parts.find(p => p.type === type)?.value;

    const nyISO = `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`;
    return new Date(nyISO);
    }

    const currentNYTime = getCurrentNewYorkTime();

    const diffInMs = currentNYTime - nyPostTime;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const isWithin2Hours = diffInHours >= 0 && diffInHours <= 2;


    const postDateTime = nyPostTime.toString().replace(/GMT.*$/, '');
    const currentDateTime = currentNYTime.toString().replace(/GMT.*$/, '');
    console.log("🕒 Agora NY Post Time:", nyPostTime.toString());
    console.log("🕒 Current NY Time:", currentNYTime.toString());
    console.log("🕓 Difference in hours:", diffInHours.toFixed(2));

    allure.addStep('Agora Post Time (NY): ' + postDateTime);
    allure.addStep('Current Time (NY): ' + currentDateTime);

    await expect(isWithin2Hours).toBe(true);
    allure.addStep('✅ Verified: Agora post is within 2 hours of current NY time.');

}

const verifyAgorasBeyondDaysPost = async () => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();

    await driver.pause(5000);

    allure.addStep('Click on "Beyond 7 days"');
    await $(agorasPage.upcomingNavBtn).click();
    
    allure.addStep('Click on "Beyond 7 days" post');
    await $(agorasPage.thisWeekPost).click();
    await driver.pause(3000);

    allure.addStep('Get post date and time');
    const postDateTime = await $(agorasPage.getAgoraDateTime).getText();

    const cleanedDateTime = postDateTime.replace(/\s[A-Za-z]+\/[A-Za-z_]+$/, '').trim();
    const [datePart, timePart] = cleanedDateTime.split('|').map(part => part.trim());
    const fullDateTime = `${datePart} ${timePart}`;
    allure.addStep('Agora post date and time is: ' + fullDateTime);
    console.log('Agora post date and time is: ' + fullDateTime);

    const parsedDate = new Date(fullDateTime);

    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);

    const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    });

    const formattedNow = formatter.format(now);
    const formattedSevenDaysLater = formatter.format(sevenDaysLater);

    allure.addStep('Current Date: ' + formattedNow);
    allure.addStep('Date 7 Days Later: ' + formattedSevenDaysLater);

    const isAfter7Days = parsedDate > sevenDaysLater;
    await expect(isAfter7Days).toBe(true);
    allure.addStep('✅ Verified: Post date is after 7 days from now.');

}

const verifyParticipateWithIn7daysAndBeyond7days = async () => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();
    await driver.pause(5000);

    allure.addStep('Click on "Within 7 days"');
    await $(agorasPage.thisWeekNavBtn).click();

    allure.addStep('Click on "Within 7 days" post');
    await $(agorasPage.thisWeekPost).click();
    await driver.pause(3000);


    try{
        allure.addStep('Click on "Attendance Confirmed" button');
        await $(agorasPage.attendanceConfirmedBtn).click();
    }  catch (error) {
        await scrollInsideElementDown(agorasPage.postParent, 0.3, 300);
        await $(agorasPage.attendanceConfirmedBtn).click();
    }
    

    const participateWithin7Days = await $(agorasPage.participateBtn);
    await expect(participateWithin7Days).toBeDisplayed();
    allure.addStep('✅ Verified user is "Participated" on within 7 days post');

    allure.addStep('Click on "Participate" button');
    await $(agorasPage.participateBtn).click();
    await driver.pause(3000);

    allure.addStep('Click on "NOT NOW" button');
    await $(agorasPage.notNowBtn).click();

    allure.addStep('Click on "Back Button"');
    await $(agorasPage.closeBtn).click();

    try{
        const attendanceWithin7Days = await $(agorasPage.attendanceConfirmedBtn);
        await expect(attendanceWithin7Days).toBeDisplayed();
        allure.addStep('✅ Verified user "Unparticipated" on within 7 days post');
    } catch (error) {
        await scrollInsideElementUp(agorasPage.postParent, 0.7, 300);
        const attendanceWithin7Days = await $(agorasPage.attendanceConfirmedBtn);
        await expect(attendanceWithin7Days).toBeDisplayed();
        allure.addStep('✅ Verified user "Unparticipated" on within 7 days post');
    }
    

    allure.addStep('Click on "Back Button"');
    await $(agorasPage.closeBtn).click();
    await driver.pause(3000);

    allure.addStep('Click on "Beyond 7 days"');
    await $(agorasPage.upcomingNavBtn).click();

    allure.addStep('Click on "Beyond 7 days" post');
    await $(agorasPage.thisWeekPost).click();
    await driver.pause(3000);

    try{
        allure.addStep('Click on "Attendance Confirmed" button');
        await $(agorasPage.attendanceConfirmedBtn).click();
    }  catch (error) {
        await scrollInsideElementDown(agorasPage.postParent, 0.3, 300);
        await $(agorasPage.attendanceConfirmedBtn).click();
        
    }

    const participateBeyond7Days = await $(agorasPage.participateBtn);
    await expect(participateBeyond7Days).toBeDisplayed();
    allure.addStep('✅ Verified user is "Participated" on beyond 7 days post');

    allure.addStep('Click on "Participate" button' );
    await $(agorasPage.participateBtn).click();

    allure.addStep('Click on "NOT NOW" button');
    await $(agorasPage.notNowBtn).click();

    allure.addStep('Click on "Back Button"');
    await $(agorasPage.closeBtn).click();

    try{
        const attendancebeyond7Days = await $(agorasPage.attendanceConfirmedBtn);
        await expect(attendancebeyond7Days).toBeDisplayed();
        allure.addStep('✅ Verified user "Unparticipated" on beyond 7 days post');
    } catch (error) {
        await scrollInsideElementUp(agorasPage.postParent, 0.7, 300);
        const attendancebeyond7Days = await $(agorasPage.attendanceConfirmedBtn);
        await expect(attendancebeyond7Days).toBeDisplayed();
        allure.addStep('✅ Verified user "Unparticipated" on beyond 7 days post');
    }
};


const verifyCommentVoteReplyEditDeleteFunctionality = async (comment, editComment) => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();
    await driver.pause(5000);

    allure.addStep('Click on "Within 7 days"');
    await $(agorasPage.thisWeekNavBtn).click();

    allure.addStep('Click on "Within 7 days" post');
    await $(agorasPage.thisWeekPost).click();
    await driver.pause(3000);

    await scrollInsideElementDown(agorasPage.postParent, 0.8, 300);
    try{
        allure.addStep('Click on Share your contribution');
        await $(agorasPage.shareYourCommentButton).click();
    
    }catch (error) {
        await scrollInsideElementDown(agorasPage.postParent, 0.3, 300);
        await $(agorasPage.shareYourCommentButton).click();     
    }
   
    allure.addStep('Enter comment text: ' + comment);
    await $(agorasPage.enterComment).setValue(comment);

    allure.addStep('Click on send comment button');
    await $(agorasPage.sendCommentButton).click();

    allure.addStep('Verify comment is displayed "With in 7 days" post');
    const commentDisplayedWithIn7days = await $(agorasPage.checkCommentExist);
    await expect(commentDisplayedWithIn7days).toBeDisplayed();
    allure.addStep('Verified comment is displayed "With in 7 days": ' + comment);

    allure.addStep('Click on vote button');
    await $(agorasPage.voteButton).click();
    await driver.pause(3000);

    allure.addStep('Verify vote count "With in 7 days" post')
    const voteCountWithIn7days = await $(agorasPage.voteCount).getText();
    console.log('voteCountWithIn7days: ' + voteCountWithIn7days);
    await expect(voteCountWithIn7days).toBe('1');
    allure.addStep('Verified vote count is "With in 7 days": ' + voteCountWithIn7days);

    allure.addStep('Click on reply button');
    await $(agorasPage.replyButton).click();

    allure.addStep('Enter reply comment text: ' + comment);
    await $(agorasPage.replyComment).setValue(comment);

    allure.addStep('Click on send comment button');
    await $(agorasPage.sendCommentButton).click();

    allure.addStep('Click on back button');
    await $(agorasPage.closeBtn).click();

    allure.addStep('Verify reply comment is displayed "With in 7 days" post');
    const replyCommentWithIn7days = await $(agorasPage.checkReplyExist);
    await replyCommentWithIn7days.waitForDisplayed();
    await expect(replyCommentWithIn7days).toBeDisplayed();

    allure.addStep('Verified reply comment is displayed "With in 7 days": ' + comment);

    allure.addStep('Click on more option icon');
    await $(agorasPage.moreOptionBtn).click();

    allure.addStep('Click on edit comment');
    await $(agorasPage.editCommentBtn).click();

    allure.addStep('Send value to edit comment: ' + editComment);
    const editCommentWithIn7days = await $(`//android.widget.EditText[@text='${comment}']`);
    await editCommentWithIn7days.clearValue();
    await editCommentWithIn7days.setValue(editComment);

    allure.addStep('Click on send comment button');
    await $(agorasPage.sendCommentButton).click();

    allure.addStep('Verify edit comment is displayed "With in 7 days" post');
    const editElementWithIn7days = await  $(`//android.widget.TextView[@text='${editComment}']`);
    editElementWithIn7days.waitForDisplayed();
    await expect(editElementWithIn7days).toBeDisplayed();
    allure.addStep('Verified edit comment is displayed "With in 7 days": ' + comment);

    allure.addStep('Click on more option icon');
    await $(agorasPage.moreOptionBtn).click();

    allure.addStep('Click on delete comment');
    await $(agorasPage.deleteCommentBtn).click();

    allure.addStep('Verify comment is delete "With in 7 days" post');
    const commentDeleteWithIn7days = await $(agorasPage.checkCommentExist);
    const isDeletedCommentExistWithIn7Days = await commentDeleteWithIn7days.isExisting();
    await expect(isDeletedCommentExistWithIn7Days).toBe(false);
    allure.addStep('Verified comment is delete "With in 7 days"' );

    allure.addStep('Click on close share contribution button');
    await $(agorasPage.closeShareContribution).click()

    allure.addStep('Click on back button');
    await $(agorasPage.closeBtn).click()


    allure.addStep('Click on "Beyond 7 days"');
    await $(agorasPage.upcomingNavBtn).click();

    allure.addStep('Click on "Beyond 7 days" post');
    await $(agorasPage.thisWeekPost).click();
    await driver.pause(3000);

    await scrollInsideElementDown(agorasPage.postParent, 0.8, 300);

    try{
        allure.addStep('Click on Share your contribution');
        await $(agorasPage.shareYourCommentButton).click();
    
    }catch (error) {
        await scrollInsideElementDown(agorasPage.postParent, 0.3, 300);
        await $(agorasPage.shareYourCommentButton).click();     
    }

    allure.addStep('Enter comment text: ' + comment);
    await $(agorasPage.enterComment).setValue(comment);

    allure.addStep('Click on send comment button');
    await $(agorasPage.sendCommentButton).click();

    allure.addStep('Verify comment is displayed "Beyond in 7 days" post');
    const commentDisplayedBeyond7days = await $(agorasPage.checkCommentExist);
    await expect(commentDisplayedBeyond7days).toBeDisplayed();
    allure.addStep('Verified comment is displayed "Beyond 7 days": ' + comment);

    allure.addStep('Click on vote button');
    await $(agorasPage.voteButton).click();
    await driver.pause(3000);

    allure.addStep('Verify vote count "Beyond 7 days" post')
    const voteCountBeyond7days = await $(agorasPage.voteCount).getText();
    console.log('voteCountBeyond7days: ' + voteCountBeyond7days);
    await expect(voteCountBeyond7days).toBe('1');
    allure.addStep('Verified vote count is "Beyond 7 days": ' + voteCountBeyond7days);

    allure.addStep('Click on reply button');
    await $(agorasPage.replyButton).click();

    allure.addStep('Enter reply comment text: ' + comment);
    await $(agorasPage.replyComment).setValue(comment);

    allure.addStep('Click on send comment button');
    await $(agorasPage.sendCommentButton).click();

    allure.addStep('Click on back button');
    await $(agorasPage.closeBtn).click();

    allure.addStep('Verify reply comment is displayed "Beyond 7 days" post');

    const replyCommentBeyond7days = await $(agorasPage.checkReplyExist);
    await replyCommentBeyond7days.waitForDisplayed();
    await expect(replyCommentBeyond7days).toBeDisplayed();

    allure.addStep('Verified reply comment is displayed "Beyond 7 days": ' + comment);

    allure.addStep('Click on more option icon');
    await $(agorasPage.moreOptionBtn).click();

    allure.addStep('Click on edit comment');
    await $(agorasPage.editCommentBtn).click();

    allure.addStep('Send value to edit comment: ' + editComment);
    const editCommentBeyond7days = await $(`//android.widget.EditText[@text='${comment}']`);
    await editCommentBeyond7days.clearValue();
    await editCommentBeyond7days.setValue(editComment);

    allure.addStep('Click on send comment button');
    await $(agorasPage.sendCommentButton).click();

    allure.addStep('Verify edit comment is displayed "Beyond 7 days" post');
    const editElementBeyond7days = await  $(`//android.widget.TextView[@text='${editComment}']`);
    editElementBeyond7days.waitForDisplayed();
    await expect(editElementBeyond7days).toBeDisplayed();
    allure.addStep('Verified edit comment is displayed "Beyond 7 days": ' + editComment);

    allure.addStep('Click on more option icon');
    await $(agorasPage.moreOptionBtn).click();

    allure.addStep('Click on delete comment');
    await $(agorasPage.deleteCommentBtn).click();

    allure.addStep('Verify comment is delete "Beyond 7 days" post');
    const commentDeleteBeyond7days = await $(agorasPage.checkCommentExist);
    const isDeletedCommentExistBeyond = await commentDeleteBeyond7days.isExisting();
    await expect(isDeletedCommentExistBeyond).toBe(false);``
    allure.addStep('Verified comment is delete "Beyond 7 days"');
   
}

const verifyCommentDisplayOnWith7DaysAndBeyond7DaysAsPost = async (comment) => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();
    await driver.pause(5000);

    allure.addStep('Click on "Within 7 days"');
    await $(agorasPage.thisWeekNavBtn).click();

    allure.addStep('Click on "Within 7 days" post');
    await $(agorasPage.thisWeekPost).click();
    await driver.pause(3000);

    await scrollInsideElementDown(agorasPage.postParent, 0.8, 300);
    try{
        allure.addStep('Click on Share your contribution');
        await $(agorasPage.shareYourCommentButton).click();
    
    }catch (error) {
        await scrollInsideElementDown(agorasPage.postParent, 0.5, 300);
        await $(agorasPage.shareYourCommentButton).click();     
    }
   
    allure.addStep('Enter comment text: ' + comment);
    await $(agorasPage.enterComment).setValue(comment);

    allure.addStep('Click on send comment button');
    await $(agorasPage.sendCommentButton).click();

    allure.addStep('Click on close Share Contribution button');
    await $(agorasPage.closeShareContribution).click();

    allure.addStep('Click on back button');
    await $(agorasPage.closeBtn).click();

    scrollInsideElementUp(agorasPage.postParent, 0.8, 300);

    allure.addStep('Verify Share Contribution comment is displayed "With in 7 days" post');
    const commentDisplayedWithIn7daysPost = await  $(`//android.widget.TextView[@text='${comment}']`);
    await commentDisplayedWithIn7daysPost.waitForDisplayed();
    await expect(commentDisplayedWithIn7daysPost).toBeDisplayed();

    allure.addStep('Verified Share Contribution comment is displayed "With in 7 days" post');

    allure.addStep('Click on "Within 7 days" post');
    await  $(`//android.widget.TextView[@text='${comment}']`).click();

    await scrollInsideElementDown(agorasPage.postParent, 0.8, 300);
    try{
        allure.addStep('Click on Share your contribution');
        await $(agorasPage.shareYourCommentButton).click();
    
    }catch (error) {
        await scrollInsideElementDown(agorasPage.postParent, 0.5, 300);
        await $(agorasPage.shareYourCommentButton).click();     
    }

    allure.addStep('Click on more option icon');
    await $(agorasPage.moreOptionBtn).click();

    allure.addStep('Click on delete comment');
    await $(agorasPage.deleteCommentBtn).click();

    allure.addStep('Click on close Share Contribution button');
    await $(agorasPage.closeShareContribution).click();

    allure.addStep('Click on back button');
    await $(agorasPage.closeBtn).click();

    allure.addStep('Click on "Beyond 7 days"');
    await $(agorasPage.upcomingNavBtn).click();

    allure.addStep('Click on "Beyond 7 days" post');
    await $(agorasPage.thisWeekPost).click();
    await driver.pause(3000);

    await scrollInsideElementDown(agorasPage.postParent, 0.8, 300);

    try{
        allure.addStep('Click on Share your contribution');
        await $(agorasPage.shareYourCommentButton).click();
    
    }catch (error) {
        await scrollInsideElementDown(agorasPage.postParent, 0.5, 300);
        await $(agorasPage.shareYourCommentButton).click();     
    }

    allure.addStep('Enter comment text: ' + comment);
    await $(agorasPage.enterComment).setValue(comment);

    allure.addStep('Click on send comment button');
    await $(agorasPage.sendCommentButton).click();

    allure.addStep('Click on close Share Contribution button');
    await $(agorasPage.closeShareContribution).click();

    allure.addStep('Click on back button');
    await $(agorasPage.closeBtn).click();

    scrollInsideElementUp(agorasPage.postParent, 0.8, 300);

    allure.addStep('Verify Share Contribution comment is displayed "Beyond 7 days" post');
    const commentDisplayedBeyond7daysPost = await  $(`//android.widget.TextView[@text='${comment}']`);
    await commentDisplayedBeyond7daysPost.waitForDisplayed();
    await expect(commentDisplayedBeyond7daysPost).toBeDisplayed();

    allure.addStep('Verified Share Contribution comment is displayed "Beyond 7 days" post');

    allure.addStep('Click on "Beyond 7 days" post');
    await  $(`//android.widget.TextView[@text='${comment}']`).click();

    await scrollInsideElementDown(agorasPage.postParent, 0.8, 300);
    try{
        allure.addStep('Click on Share your contribution');
        await $(agorasPage.shareYourCommentButton).click();
    
    }catch (error) {
        await scrollInsideElementDown(agorasPage.postParent, 0.5, 300);
        await $(agorasPage.shareYourCommentButton).click();     
    }

    allure.addStep('Click on more option icon');
    await $(agorasPage.moreOptionBtn).click();

    allure.addStep('Click on delete comment');
    await $(agorasPage.deleteCommentBtn).click();

}

const verifyPastDisplayVideoOrImage = async (comment) => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();
    await driver.pause(5000);

    allure.addStep('Click on "Past"');
    await $(agorasPage.previousNavBtn).click();

    allure.addStep('Verify on "Past post Video"');
    const postVideo = await $(agorasPage.pastVideoPlayer);
    await postVideo.waitForDisplayed();
    await expect(postVideo).toBeDisplayed();
    allure.addStep('Verified on "Past post Video"');

    await scrollInsideElementDown(agorasPage.postParent, 0.3, 300);

    allure.addStep('Verify Share Contribution comment is not displayed "Past" post');
    const commentDisplayedPast = await $(`//android.widget.TextView[@text='${comment}']`);
    const isCommentDisplayed = await commentDisplayedPast.isDisplayed();
    expect(isCommentDisplayed).toBe(false);
    allure.addStep('Verified Share Contribution comment is not displayed "Past" post');
}

const verifyCommentVoteReplyDisplayedPast = async () => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();
    await driver.pause(5000);

    allure.addStep('Click on "Past"');
    await $(agorasPage.previousNavBtn).click();

    allure.addStep('Click on "Past" post');
    await $(agorasPage.pastPost).click();
    await driver.pause(3000);

    await scrollInsideElementDown(agorasPage.postParent, 0.8, 300);
    try{
        await scrollInsideElementDown(agorasPage.postParent, 0.5, 300);
        allure.addStep('Click on Share your contribution');
        await $(agorasPage.shareYourCommentButton).click();
    
    }catch (error) {
        await scrollInsideElementDown(agorasPage.postParent, 0.3, 300);
        await $(agorasPage.shareYourCommentButton).click();     
    }
   
    allure.addStep('Verify comment is displayed "Past" post');
    const commentDisplayedPast = await $(agorasPage.checkCommentExist);
    await expect(commentDisplayedPast).toBeDisplayed();
    allure.addStep('Verified comment is displayed "Past"');

    allure.addStep('Verify vote displayed "Past" post');
    await $(agorasPage.voteButton).click();
    const votePast = await $(agorasPage.voteButton);
    await expect(votePast).toBeDisplayed();
    allure.addStep('Verified vote displayed "Past" post');

    allure.addStep('Verify reply comment is displayed "Past" post');
    const replyCommentPast = await $(agorasPage.checkReplyExist);
    await replyCommentPast.waitForDisplayed();
    await expect(replyCommentPast).toBeDisplayed();
    allure.addStep('Verified reply comment is displayed "Past"');

}

const verifyBeyond7DaysAsPostDisplayWith7Days = async (postTitle) => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();
    await driver.pause(5000);

    allure.addStep('Click on "Within 7 days"');
    await $(agorasPage.thisWeekNavBtn).click();

    allure.addStep('Verify on "Byond 7 days" post is displayed in "Within 7 days" post');
    const postDisplayedWithIn7Days = await $(`//android.widget.TextView[@text='${postTitle}']`);
    try {
        await postDisplayedWithIn7Days.waitForDisplayed({ timeout: 5000 }); 
    } catch (err) {
    }
    
    await expect(postDisplayedWithIn7Days).toBeDisplayed();
    allure.addStep('Verified "Beyond 7 days" post is displayed in "Within 7 days" post');
}

const verifyAgorasPastDaysPostMoreThank2Hours = async (postTitle) => {
    const agorasPage = new AgorasPage();

    allure.addStep('Verify the Agoras tab button is visible');
    await $(agorasPage.agorasTabBtn).waitForDisplayed();

    allure.addStep('Click on the Agoras tab button');
    await $(agorasPage.agorasTabBtn).click();

    await driver.pause(5000);

    allure.addStep('Click on "Past"');
    await $(agorasPage.previousNavBtn).click();

    scrollInsideElementDown(agorasPage.postParent, 0.8, 300);
    
    allure.addStep('Click on "Past" post');
    await $(`//android.view.ViewGroup[contains(@content-desc, "${postTitle}")]`).click();
    await driver.pause(3000);

    allure.addStep('Get post date and time ');
    const postDateTimeText = await $(agorasPage.getAgoraDateTimePastPost).getText();
    console.log('Post date text:', postDateTimeText);
    let updatedDate = postDateTimeText.replace("ANSWERED ", "") + " 6:00 AM";
    console.log('Updated post date text:', updatedDate);

    const cleanedText = updatedDate.trim();

    const timeMatch = cleanedText.match(/\d{1,2}:\d{2}\s?(AM|PM)/i);
    const timePart = timeMatch ? timeMatch[0] : null;

    const [month, day, year] = cleanedText.replace(timePart, '').trim().split(/\s+/);

    const datePart = `${month} ${day}, ${year} ${timePart}`;

    const nyPostTime = new Date(datePart);  

    function getCurrentNewYorkTime() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const parts = formatter.formatToParts(now);
    const get = (type) => parts.find(p => p.type === type)?.value;

    const nyISO = `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`;
    return new Date(nyISO);
    }

    const currentNYTime = getCurrentNewYorkTime();

    const diffInMs = currentNYTime - nyPostTime;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const isMoreThan2Hours = diffInHours > 2;


    const postDateTime = nyPostTime.toString().replace(/GMT.*$/, '');
    const currentDateTime = currentNYTime.toString().replace(/GMT.*$/, '');
    console.log("🕒 Agora NY Post Time:", nyPostTime.toString());
    console.log("🕒 Current NY Time:", currentNYTime.toString());
    console.log("🕓 Difference in hours:", diffInHours.toFixed(2));

    allure.addStep('Agora Post Time (NY): ' + postDateTime);
    allure.addStep('Current Time (NY): ' + currentDateTime);

    await expect(isMoreThan2Hours).toBe(true);
    allure.addStep('✅ Verified: Agora post is within 2 hours of current NY time.');

}


module.exports = {
    verifyAgorasCategories,
    verifyAgorasThisWeekActiveFirstTime,
    verifyAgorasThisWeekPost,
    verifyAgorasWithIn7DaysPostMoreThank2Hours,
    verifyAgorasBeyondDaysPost,
    verifyAgorasBeyondDaysPost,
    verifyParticipateWithIn7daysAndBeyond7days,
    verifyCommentVoteReplyEditDeleteFunctionality,
    verifyCommentDisplayOnWith7DaysAndBeyond7DaysAsPost,
    verifyPastDisplayVideoOrImage,
    verifyCommentVoteReplyDisplayedPast,
    verifyBeyond7DaysAsPostDisplayWith7Days,
    verifyAgorasPastDaysPostMoreThank2Hours,
}