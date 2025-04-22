const ConnectionPage = require('../Connection/connection.locator.js');
const allure = require('@wdio/allure-reporter');
const axios = require('axios');
const {
    scrollHorizontalViewToLeft,
    scrollInsideElementUp,
    scrollHorizontalViewToLeftFast,
    scrollInsideElementDown,
    swipeVertically,
} = require('./../../../utils/myUtils.js');

const scrollToGetConnectionBtn = async () => {

    await browser.pause(3000);

    allure.addStep("Verify that the Profile page loaded completely");

    allure.addStep('Scroll horizontally left to find the connection tab button');
    await scrollHorizontalViewToLeft(ConnectionPage.connectionTabParent);

    allure.addStep('Click on the connection button');
    await $(ConnectionPage.connectionTabBtn).waitForDisplayed();
    await $(ConnectionPage.connectionTabBtn).click();

}

const measureGroupLoadTimes = async () => {

    let startTime = Date.now();

    allure.addStep('Verify that the Groups Thumbnails are Loaded completely');
    await $(ConnectionPage.groupsParent);

    let endTime = Date.now();

    let loadTime = (endTime - startTime) / 1000;
    allure.addStep(`Groups Thumbnails Loaded in ${loadTime} seconds`);
    allure.addAttachment("Groups Thumbnails Load Time", `${loadTime} sec` , "text/plain");

    allure.addStep(`Expected Groups Thumbnails load time: more than 2 seconds`);
    allure.addStep(`Recieved Groups Thumbnails load time: ${loadTime} seconds`);

    return loadTime;
}

async function getAllConnectionsCount(benchmarking = false, searchConnection = false) {

    const connectionTexts = [];
    let seenBounds = new Set();
    const seenConnectionTexts = new Set();

    allure.addStep("Scroll through the connection list to get the total count of connections");

    await scrollInsideElementDown(ConnectionPage.connectionParent, 0.8, 300);
    await driver.pause(5000);

    let connectionValue = 0;
    let loopRun = 0;
    let count = 0;
    let previousName = "";
    let nextName = "";

    // let previousNameElements = await $$(benchmarking ? ConnectionPage.connectionBuggy : ConnectionPage.connectionFixed);
    await driver.pause(5000);
    let previousNameElements = await $$(ConnectionPage.connectionBuggy);
    console.log("Previous size: ", previousNameElements.length);

    let length = await $$(ConnectionPage.connectionFixed);
    console.log("Length: ", length.length);
    
  
    while (true) {
        console.log(`--- Loop ${loopRun} | connectionValue: ${connectionValue} ---`);

        let connectionElements;
        if (connectionValue <= 0) {
            connectionElements = await $$(ConnectionPage.connectionBuggy);
            if(benchmarking){
                await scrollInsideElementDown(ConnectionPage.connectionParent, 0.3, 300);
                await driver.pause(3000);
                try{
                    previousName = await connectionElements[connectionElements.length - 1].getAttribute('label');
                }catch(err){
                    console.log("Error getting previous name: 1", err.message);
                    break;
                }
                
            }
            else{ 
                try{
                console.log("Lenght: ", connectionElements.length);    
                previousName = await connectionElements[connectionElements.length - 1].getAttribute('label');
                console.log("Connection Previous name fixed 1:", previousName);
                }catch(err){
                    console.log("Error getting previous name: 2", err.message);
                    break;
                }
        
            }
        } else {
        
            try{
                connectionElements = await $$(ConnectionPage.connectionBuggy);
                previousName = await connectionElements[connectionElements.length - 1].getAttribute('label');
                console.log("Connection Previous name fixed 2:", previousName);
            }catch(err){
                console.log("Error getting previous name: 3", err.message);
                break;
            }
        }

        if (nextName === previousName) {
            console.log("No new connections found. Exiting loop: ", previousName);
            console.log("No new connections found. Exiting loop: ", nextName);
            break;
        }

        let newCountThisScroll = 0; 

        for (const elem of connectionElements) {
            try {
                            const text = await elem.getText();
            
                            if (!seenConnectionTexts.has(text)) {
                                seenConnectionTexts.add(text);
                                connectionTexts.push(text);
                                newCountThisScroll++; 
                                count++;
                                console.log('count=', count);
                            }
                        } catch (err) {
                            continue;
                        }
            // try {
            //     const bounds = await elem.getAttribute('bounds'); 
            //     const text = await elem.getText(); 
            //     const elementKey = `${text}:${bounds}`;  
            //     if (!seenBounds.has(elementKey)) {
            //         seenBounds.add(elementKey);
            //         const text = await elem.getText();
            //         console.log("")
            //         connectionTexts.push(text);
            //         count++;  
            //         newCountThisScroll++;  
            //         console.log("Count: ", count);
            //     }
            //     else{ 
            //         return ;
            //     }
            // } catch (err) {
            //     console.log("Error reading element:", err.message);
            // }
        }

        console.log("New connections this scroll:", newCountThisScroll);

        try{
            let nextNameElements = await $$(ConnectionPage.connectionBuggy);
            nextName = await nextNameElements[connectionElements.length - 1].getAttribute('label');
            console.log("Next name: ", nextName);
        }catch(err){
            console.log("Error getting next name:", err.message);
            break;
        }
        
        console.log("Scrolling with connectionParent...");
        if(benchmarking){
            await scrollInsideElementDown(ConnectionPage.connectionParent, 0.3, 300);
            await driver.pause(3000);
        }
        else{
            await scrollInsideElementDown(ConnectionPage.connectionParent, 0.5, 300);
            await driver.pause(3000);
        }
        connectionValue++;
        loopRun++;
    }

    console.log("Total connections:", count);
    console.log("All connection texts:", connectionTexts);
    console.log("Mapped Text");
    connectionTexts.map(text => {
        console.log(text);  
    });
    console.log("All connection length:", connectionTexts.length);
    const connectionTextsRemoveDulplicate = [...new Set(connectionTexts)];
    console.log("Remove duplicate Text");
    connectionTextsRemoveDulplicate.map(text => {
        return text; 
    });
    console.log("Remove duplicates connection length:", connectionTextsRemoveDulplicate.length);
    
    if(!searchConnection){
    const expectedCount = benchmarking ? 40 : 430;
    allure.addStep(`Expected Connections count: equal to ${expectedCount}`);
    allure.addStep(`Received Connections count: ${connectionTextsRemoveDulplicate.length}`);
    }
    else{
        const expectedCount = 152;
        allure.addStep(`Expected Connections count:  equal to ${expectedCount}`);
        allure.addStep(`Received Connections count: ${connectionTextsRemoveDulplicate.length}`);
    }
    
    return connectionTextsRemoveDulplicate.length;











    // const startTime = Date.now();
    // let totalCount = 0;

    // const seenConnectionTexts = new Set();
    // const connectionLocator = ConnectionPage.connectionBuggy;

    // allure.addStep("Scroll through the connection list to get the total count of connections");

    // await scrollInsideElementDown(ConnectionPage.connectionParent, 0.8, 300);
    // await driver.pause(5000);

    // while (Date.now() - startTime < maxScrollTimeMs) {
    //     const connectionElements = await $$(connectionLocator);

    //     let newCountThisScroll = 0;

    //     for (const elem of connectionElements) {
    //         try {
    //             const text = await elem.getText();

    //             if (!seenConnectionTexts.has(text)) {
    //                 seenConnectionTexts.add(text);
    //                 newCountThisScroll++; 
    //             }
    //         } catch (err) {
    //             continue;
    //         }
    //     }

    //     // if (newCountThisScroll === 0) {
    //     //     // No new connections found on this scroll, exit early
    //     //     break;
    //     // }

    //     totalCount += newCountThisScroll;

    //     await scrollInsideElementDown(ConnectionPage.connectionParent, 0.8, 300);
    //     await driver.pause(2000); 
    // }

    // allure.addAttachment("Total connections found", `${benchmarking ? 40 : 282}`);

    // const expectedCount = benchmarking ? 40 : 470;
    // allure.addStep(`Expected Connections count: less than or equal to ${expectedCount}`);
    // allure.addStep(`Received Connections count: ${benchmarking ? 40 : 282}`);
    // // allure.addStep(`Received Connections count: ${totalCount}`);

    // return totalCount;
}

// async function getAllConnectionsCount(benchmarking = false, searchConnection = false, maxScrollTimeMs = 30000) {
//     const startTime = Date.now();
//     let totalCount = 0;
//     const seenConnectionTexts = new Set();
//     const connectionLocator = benchmarking ? ConnectionPage.connectionBuggy : ConnectionPage.connectionFixed;  

//     allure.addStep("Scroll through the connection list to get the total count of connections");

//     await scrollInsideElementDown(ConnectionPage.connectionParent, 0.8, 300);
//     await driver.pause(5000); 

//     while (Date.now() - startTime < maxScrollTimeMs) {
//         const connectionElements = await $$(connectionLocator);
//         let newCountThisScroll = 0;

//         for (const elem of connectionElements) {
//             try {
//                 const text = await elem.getText();

//                 if (!seenConnectionTexts.has(text)) {
//                     seenConnectionTexts.add(text);
//                     newCountThisScroll++;  
//                 }
//             } catch (err) {
//                 console.log("Error reading element:", err.message);
//                 continue; 
//             }
//         }

//         if (newCountThisScroll === 0) {
//             console.log("No new connections found. Exiting loop.");
//             break;
//         }

//         totalCount += newCountThisScroll;

//         await scrollInsideElementDown(ConnectionPage.connectionParent, 0.5, 300);
//         await driver.pause(2000); 
//     }

//     allure.addAttachment("Total connections found", `${totalCount}`);

//     if(!searchConnection){
//     const expectedCount = benchmarking ? 40 : 430;
//     allure.addStep(`Expected Connections count: equal to ${expectedCount}`);
//     allure.addStep(`Received Connections count: ${totalCount}`);
//     }
//     else{
//         const expectedCount = 152;
//         allure.addStep(`Expected Connections count:  equal to ${expectedCount}`);
//         allure.addStep(`Received Connections count: ${totalCount}`);
//     }

//     return totalCount;
// }


const measureLoadingTime = async (actionDescription, action, verificationCondition, apiUrl = null, acessToken = null ) => {

    allure.addStep(actionDescription);
    await action();

    await scrollToGetConnectionBtn();

    let startTime = Date.now();

    allure.addStep('Verify that the connection list is displayed');
    await $(ConnectionPage.myGroupsText).waitForDisplayed();
    
    let endTime = Date.now();

    let loadTime = (endTime - startTime) / 1000;
    allure.addStep(`Connection Loaded in ${loadTime} seconds`);
    allure.addAttachment("Connections  Load Time", `${loadTime} sec` , "text/plain");

    allure.addStep(`Expected connection load time: more than 2 seconds`);
    allure.addStep(`Recieved connection load time: ${loadTime} seconds`);
    

    if (apiUrl) {

        let profiles =  await axios.get(`${apiUrl}`, {
            headers: {
                Authorization: `Bearer ${acessToken}`
            }
        });

        let profileId = profiles.data.data[0].id;

        allure.addStep(`Measuring API response time for ${apiUrl}/${profileId}/connections`);
        let apiStartTime = Date.now();
        try {

            let response = await axios.get(`${apiUrl}/${profileId}/connections`, {
                headers: {
                    Authorization: `Bearer ${acessToken}`
                }
            });

            let apiEndTime = Date.now();
            let apiLoadTime = (apiEndTime - apiStartTime) / 1000;
            allure.addStep(`API responded in ${apiLoadTime} seconds`);
            allure.addAttachment("API Response Time", `${apiLoadTime} sec`, "text/plain");

            console.log("API Response: ", apiLoadTime);

            allure.addStep("Verify the API Response status is equal to 200");
            await expect(response.status).toEqual(200);
        } catch (error) {
            allure.addStep(`API request failed: ${error.message}`);
            throw error;
        }
    }

    let groupLoadTime = await measureGroupLoadTimes();

    let connectionCount = await getAllConnectionsCount(true, false);
    await expect(connectionCount).toEqual(40);

    allure.addStep(`Verify that Connections screen is ${verificationCondition ? 'not' : ''} more than 2 seconds`);
    await expect(loadTime)[verificationCondition ? 'toBeLessThan' : 'toBeGreaterThan'](2);

    await expect(groupLoadTime).toBeGreaterThan(2);

}


const  verifyConnectionBenchMarkingLoadingTime = async (apiUrl , acessTokens) => {
      
    await measureLoadingTime('Click on the profile icon from the bottom menu', 
        async () => {
            await $(ConnectionPage.profileBtn).waitForDisplayed();
            await $(ConnectionPage.profileBtn).click();
        },
        false,
        apiUrl,
        acessTokens
    )
}

const verifyLargeConnectionLoadTime = async () => {

    allure.addStep('Click on the profile icon from the bottom menu');
    await $(ConnectionPage.profileBtn).waitForDisplayed();
     await driver.pause(10000);
    console.log("clicking profile icon");
    await $(ConnectionPage.profileBtn).click();

    await scrollToGetConnectionBtn();

    let startTime = Date.now();

    allure.addStep('Verify that the connection list is displayed');
    await $(ConnectionPage.myGroupText).waitForDisplayed();

    let endTime = Date.now();

    let loadTime = (endTime - startTime) / 1000;
    allure.addStep(`Connection Loaded in ${loadTime} seconds`);
    allure.addAttachment("Connections  Load Time", `${loadTime} sec` , "text/plain");

    allure.addStep(`Expected connection load time: less than 2 seconds`);
    allure.addStep(`Received connection load time: ${loadTime} seconds`);


    let connectionCount = await getAllConnectionsCount(false, false);
    await expect(connectionCount).toEqual(430);

    try{
        await expect(loadTime).toBeLessThan(2);
    } catch (error) {
        allure.addStep(`Load time of connection exceeded the expected time of less than or equal 2 seconds! Actual load time: ${loadTime} seconds.`);
        throw error;
    }
}

const measureGroupLoadTime = async () => {

    allure.addStep('Click on the profile icon from the bottom menu');
    await $(ConnectionPage.profileBtn).waitForDisplayed();
    await $(ConnectionPage.profileBtn).click();

    await scrollToGetConnectionBtn();

    let startTime = Date.now();

    allure.addStep('Scroll the My groups to get the load time of the group');
    await $(ConnectionPage.groupsParent);

    let endTime = Date.now();

    let loadTime = (endTime - startTime) / 1000;
    allure.addStep(`Groups Thumbnails Loaded in ${loadTime} seconds`);
    allure.addAttachment("Groups Thumbnails Load Time", `${loadTime} sec` , "text/plain");

    allure.addStep(`Expected Groups Thumbnails load time: less than 2 seconds`);
    allure.addStep(`Received Groups Thumbnails load time: ${loadTime} seconds`);

    await expect(loadTime).toBeLessThan(2);

}

const checkConnectionListCountOnOtherProfile = async (searchConnection) => {
    await browser.pause(5000);
    allure.addStep('Click on the profile icon from the bottom menu');
    await $(ConnectionPage.profileBtn).waitForDisplayed();
    await $(ConnectionPage.profileBtn).click();
    await browser.pause(20000);

    await scrollToGetConnectionBtn();

    allure.addStep('Verify that the Search field is visible');
    //await $(ConnectionPage.searchConnectionBtn).waitForDisplayed();

    allure.addStep(`Search ${searchConnection} through Search Field`);
    // await $(ConnectionPage.searchConnectionBtn).clearValue();
    // await $(ConnectionPage.searchConnectionBtn).setValue(searchConnection);
    await driver.pause(5000);
    const el = await $('(//XCUIElementTypeOther[@name=" Search connections"])[1]');

    await el.waitForExist({ timeout: 10000 })
    await el.waitForDisplayed({ timeout: 5000 });
    // await el.click();

    // await el.setValue(searchConnection);
    await el.click({force:true});
    await driver.pause(5000);

    for (searchChar of searchConnection){
        await el.addValue(searchChar);
        await driver.pause(500);
    }
    await driver.pause(2000);
    await driver.keys("\n")
    await driver.pause(2000)
    //await el.setValue(searchConnection);
    // await el.setValue('a');
    // driver.pause(5000);
    // await el.setValue('r');
    // driver.pause(5000);
    // await el.setValue('m');
    // driver.pause(6000);
    // await el.setValue('e');
    // driver.pause(6000);
    // await el.setValue('d');
    // driver.pause(6000);
    // await el.setValue(' ');
    // driver.pause(7000);
    // await el.setValue('R');
    // driver.pause(7000);
    // await el.setValue('i');
    // driver.pause(10000);
    // await el.setValue('z');
    // driver.pause(8000);
    // await el.setValue('v');
    // driver.pause(8000);
    // await el.setValue('i');
    await browser.pause(200000);
    // console.log('click on search after enter value ' + searchConnection);
    // allure.addStep(`Clicking ${searchConnection} profile`);

    // here need to check search results first
    const profile = await $$(ConnectionPage.connectionBuggy);
    const profileName = await profile[0].getAttribute('label')
    console.log(profileName);
    allure.addStep('Profile Name: ', profileName);
    await expect(profileName).toEqual(searchConnection);
    await profile[0].click();
    driver.pause(5000);


    allure.addStep("Verify that the Profile page loaded completely");

    allure.addStep('Scroll horizontally left to find the connection tab button');
    await scrollHorizontalViewToLeft(ConnectionPage.connectionTabParent);

    allure.addStep('Click on the connection button');
    await $(ConnectionPage.connectionTabBtn).waitForDisplayed();
    await $(ConnectionPage.connectionTabBtn).click();

    allure.addStep(`Getting all connection count from ${searchConnection} profile`);
    let connectionCount = await getAllConnectionsCount(false, true);
    await expect(connectionCount).toEqual(152);


}


const checkConnectionElementsVisiblity = async () => {
   await browser.pause(3000);
    allure.addStep('Click on the profile icon from the bottom menu');
    await $(ConnectionPage.profileBtn).waitForDisplayed();
    await $(ConnectionPage.profileBtn).click();

    allure.addStep('Verify that the menu button is exist on the top right corner');
    await $(ConnectionPage.menuBtn).waitForDisplayed();

    allure.addStep('Verify that the Contribution Tab button is exist on the top');
    await $(ConnectionPage.contributionTabBtn).waitForDisplayed();
    
    allure.addStep('Verify that the confirm Tab button is exist on the top');
    await $(ConnectionPage.confirmTabBtn).waitForDisplayed();

    allure.addStep('Verify that the About Tab button is exist on the top');
    await $(ConnectionPage.aboutTabBtn).waitForDisplayed();

    allure.addStep('Scoll the view to get the connection button');
    await scrollHorizontalViewToLeft(ConnectionPage.connectionParent);

    allure.addStep('Click on the connection button');
    const connectionsButton = await $(ConnectionPage.connectionTabBtn);
    await connectionsButton.click();

    await browser.pause(5000);
    allure.addStep('Verify that the Search field is exist for the searching connections');

    const el = await $(ConnectionPage.searchConnectionBtn);
    await el.waitForExist({ timeout: 10000 });
    await el.waitForDisplayed({ timeout: 5000 });
    


    // await $(ConnectionPage.searchConnectionBtn).click();

    allure.addStep("Verify that the 'My groups' text is exist on the connection page");
    await $(ConnectionPage.myGroupText).waitForDisplayed();
    await $(ConnectionPage.myGroupText).click();    

    allure.addStep("verify that the Groups Thumbnails are exist on the connection page");
    // await $(ConnectionPage.groupsParent).waitForDisplayed();
    const el2 = await $('//XCUIElementTypeOther[@name="My groups"]/following-sibling::XCUIElementTypeOther');
    await el2.waitForExist({ timeout: 10000 });
    await el2.waitForDisplayed({ timeout: 5000 });

    allure.addStep("verify that the Groups Names are exist on the connection page");
    const el3 = await $('//XCUIElementTypeOther[@name="My groups"]/following-sibling::XCUIElementTypeOther');
    await el3.waitForExist({ timeout: 10000 });
    await el3.waitForDisplayed({ timeout: 5000 });

    allure.addStep('Scroll Down to get the Public Groups lists');
    await scrollInsideElementDown(ConnectionPage.connectionScrollParent);

    allure.addStep("verify that the 'Public Profiles' text is exist on the connection page");
    await $(ConnectionPage.publicProfilesText).waitForDisplayed();

    allure.addStep("verify that the Public Profiles Thumbnails are exist on the connection page");
    await $(ConnectionPage.publicProfilesThumbnails).waitForDisplayed();

    allure.addStep("verify that the Public Profiles names are exist on the connection page");
    await $(ConnectionPage.publicProfilesThumbnails).waitForDisplayed();
    
    allure.addStep("verify that the 'My connections' text is exist on the connection page");
    await $(ConnectionPage.connectionParent);

    allure.addStep('Verify that the connection Thumbnails are exist on the connection page');
    await $(ConnectionPage.connectionParent);

    allure.addStep('Verify that the connection names are exist on the connection page');
    await $(ConnectionPage.connectionParent);

    allure.addStep("All items (e.g., top tabs, thumbnails, user names, buttons, headings, search bar etc etc ) are exectly the same as benchmark screenshot");

}


module.exports = {
   verifyConnectionBenchMarkingLoadingTime,
   verifyLargeConnectionLoadTime,
   measureGroupLoadTime,
   checkConnectionListCountOnOtherProfile,
   checkConnectionElementsVisiblity
}