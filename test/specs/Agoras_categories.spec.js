const {
    verifyAgorasCategories,
    verifyAgorasThisWeekActiveFirstTime,
    verifyAgorasThisWeekPost,
    verifyAgorasWithIn7DaysPostMoreThank2Hours,
    verifyAgorasBeyondDaysPost,
    verifyParticipateWithIn7daysAndBeyond7days,
    verifyCommentVoteReplyEditDeleteFunctionality,
    verifyCommentDisplayOnWith7DaysAndBeyond7DaysAsPost,
    verifyPastDisplayVideoOrImage,
    verifyCommentVoteReplyDisplayedPast,
    verifyBeyond7DaysAsPostDisplayWith7Days,
    verifyAgorasPastDaysPostMoreThank2Hours,
} = require("../PageObject/Agoras/Agoras_categories.page.js");

const {
    Login,
} = require('../PageObject/Login/Login.page.js');

describe('Agoras Tab', () => {
    beforeEach(async () => {
        await Login();
    })
    afterEach(async () => {
        await browser.reloadSession();
    });

    
    it.only('Agora-001 - Verify past, Within 7 days and upcoming categories tabs are being displayed when we navigate to Agoras Tab', async () => {
        await verifyAgorasCategories();
    });
    it('Agora-002 - Verify that the middle tab ("Within 7 days") is the selected tab when user clicks on agora tab for the first time in a session', async () => {
        await verifyAgorasThisWeekActiveFirstTime();
    });

    it('Agora-003 - Verify agora scheduled for today"s date is being displayed in "With in 7 days" tab as long as current time is not more than 2 hours after', async () => {
        await verifyAgorasWithIn7DaysPostMoreThank2Hours();
    });

    it('Agora-004 - Verify Agora scheduled for within 7-calendar day period is being displayed into "Within 7 days" tab', async () => {
        await verifyAgorasThisWeekPost();
    });
    it('Agora-005 - Verify Agora scheduled for  beyond 7 days is being displayed into "Beyond 7 Days" tab', async () => {
        await verifyAgorasBeyondDaysPost();
    });

    it('Agora-006 - Verify agora scheduled for on today date is showing into "Past" tab if Agora time is being passed 2h from his start time', async () => {
        await verifyAgorasPastDaysPostMoreThank2Hours("Testing Agora with in Past - 2 hours");
    });

    it('Agora-007 - verify that agoras in the upcoming tab move to the "Within 7 days" tab when time passes and the date of the upcoming agora falls within the 7-day period and they are removed from the "Beyond 7 Days" section"', async () => {
        await verifyBeyond7DaysAsPostDisplayWith7Days('Testing Agora Beyond 7 days');
    });

    it('Agora-008 - Verify user can add contribution into agoras that are being diplaying under "With in 7 days" or "Beyond 7 days', async () => {
        await verifyCommentDisplayOnWith7DaysAndBeyond7DaysAsPost("testing");
    });

    it('Agora-009 - Verify user can participate or unparticipate in agoras in the "With in 7 days" and "Beyond 7 days"', async () => {
        await verifyParticipateWithIn7daysAndBeyond7days();
    });
    it('Agora-010 - Verify functionality testing: for agoras in the "With in 7 days" and "Beyond 7 days" sections, verify that user can vote on comments, reply to comments, edit own comments, delete comments, and verify that vote count is correct', async () => {
        await verifyCommentVoteReplyEditDeleteFunctionality("testing", "Testingsabc");
    });
    it('Agora-011 - Verify none of the contributions/ comments being displayed for Agoras that are displaying into "Past" Tab . Just video or screenshot related to that agora must be displayed ', async () => {
        await verifyPastDisplayVideoOrImage("testing");
    });  
    it('Agora-012 - Verify that if the user clicks on one of the "Past" agoras, then all related content (comments, replies to comments, votes etc) become visible"', async () => {
        await verifyCommentVoteReplyDisplayedPast();
    });  
});