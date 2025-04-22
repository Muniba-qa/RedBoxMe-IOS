const {
    Login,
    Logout
} = require('../PageObject/Login/Login.page.js');

const {
    verifyConnectionBenchMarkingLoadingTime,
    verifyLargeConnectionLoadTime,
    checkConnectionElementsVisiblity,
    checkConnectionListCountOnOtherProfile,
    measureGroupLoadTime
} = require('../PageObject/Connection/connection.page.js');

describe('Connection Tab', async () => {

    beforeEach(async () => {
        await Login();
    });

//    afterEach(async () => {
//        await Logout();
//        await browser.reloadSession();
//     });


    // it('TC-001 : Benchmarking - Verify Slow Loading Behavior of Connection Page', async () => {
    //     await verifyConnectionBenchMarkingLoadingTime(process.env.CONNECTION_PROFILE_ENDPOINT, process.env.PRODUCTION_ACCESS_TOKEN);
    // });
    // it('TC-002 : Verify connections load successfully for users with a large number of connections', async () => {
    //     await verifyLargeConnectionLoadTime();
    // });
    // it('TC-003 : Verify "My Groups" load successfully for users with a large number of Groups', async () => {
    //     await measureGroupLoadTime();
    // });
     it.only('TC-004 : Verify connections load completely for another user viewing a profile', async () => {
         await checkConnectionListCountOnOtherProfile("Sarmed Rizvi");
     }); 
    // it('TC-005 : Check all items on the page are present and correctly loading', async () => {
    //    await checkConnectionElementsVisiblity();
    // })
})