exports.config = {
    
    services: [
        [
            'appium',
            {
                args: {
                    relaxedSecurity: true, 
                    log: './logs/appium.log', 
                },
            },
        ],
    ],
    port: 4723, 
    before: async () => {
        if (driver.isAndroid) {
            await driver.updateSettings({
                waitForSelectorTimeout: 10 * 1000, 
            });
        }
    },
    
    capabilities: [
        {
            platformName: 'iOS',
            maxInstances: 1,
            'appium:deviceName': 'iPhone 15 Pro', 
            'appium:platformVersion': '18.4', 
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'XCUITest',
            'appium:autoAcceptAlerts': true,     
            'appium:autoGrantPermissions': true, 
            'appium:app': 'build/Redboxme-searching/RedBoxMe.app',  
            
            'appium:newCommandTimeout': 240,      
            'appium:webviewConnectTimeout': 5000, 
        },
    ],
    updateJob: false, 
    specs: [
        // '../test/specs/*.js', 
        // "../test/specs/Thoughts.spec.js"
        // "../test/specs/Notification.spec.js"
        "../test/specs/connection.spec.js"
    ],
    exclude: [], 
    logLevel: 'info', 
    coloredLogs: true, 
    screenshotPath: './errorShots/', 
    baseUrl: '', 
    waitforTimeout: 350000, 
    connectionRetryTimeout: 90000, 
    connectionRetryCount: 3, 
    mochaOpts: {
        ui: 'bdd', 
        timeout: 350000, 
    },
    reporters: [
        'spec',  
        ['allure', {
            outputDir: './allure-results',  
            disableWebdriverStepsReporting: false,  
            disableWebdriverScreenshotsReporting: false, 
        }],
    ],

    waitforTimeout: 30000, 
    connectionRetryTimeout: 90000,  
    connectionRetryCount: 3, 
    
    onComplete: async () => {
        const allure = require('allure-commandline');
        await allure(['generate', './allure-results', '--clean']);
        await allure(['open']);
    },

    afterTest: async (test, context, result) => {
        if (result.error) {
            const screenshot = await browser.takeScreenshot();
            allure.addAttachment('Screenshot on failure', screenshot, 'image/png');
        }
    },
};