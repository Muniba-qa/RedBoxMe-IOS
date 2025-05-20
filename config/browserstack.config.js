const allure = require("@wdio/allure-reporter").default;
const { default: axios } = require("axios");
const { JIRA_HOST, JIRA_EMAIL, JIRA_API_TOKEN } = require("../utils/constants.js");
const uploadTestResults = require("../xrays-integration/uploadResults.js");
const authenticateXray = require("../xrays-integration/xrays.api.config.js");
const fs = require("fs");
const path = "./results";

if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

const baseCapability = {
  "appium:autoAcceptAlerts": true,
  "appium:autoGrantPermissions": true,
  "appium:clearDeviceKeychain": true,
  acceptInsecureCerts: true,
  "appium:enforceAppInstall": true,
  "appium:unlockType": "pin",
  "appium:disabledWindowAnimation": true,
  "appium:clearAppCookies": true,
  "appium:noReset": false,
  "appium:fullReset": true,
  "appium:app": process.env.BROWSERSTACK_IOS_APP_PATH || "",
  "bstack:options": {
    projectName: "Alfredus",
    buildName: `Alfredus iOS build ${new Date().toISOString()}`,
    debug: true,
    networkLogs: true,
    appiumVersion: "2.6.0",
  },
};

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || "",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "",
  maxInstances: 5,
  bail: 0,

  services: [
    [
      "browserstack",
      {
        buildIdentifier: process.env.BUILD_NUMBER || "default-build",
        browserstackLocal: true,
        opts: {
          forcelocal: false,
          localIdentifier: "Alfredus",
        },
        app: process.env.BROWSERSTACK_IOS_APP_PATH || "",
      },
    ],
  ],

  capabilities: [
    // {
    //   ...baseCapability,
    //   "bstack:options": { ...baseCapability["bstack:options"], deviceName: "iPhone 15", osVersion: "17.0" },
    // },
    // {
    //   ...baseCapability,
    //   "bstack:options": { ...baseCapability["bstack:options"], deviceName: "iPhone 15 Pro", osVersion: "17.0" },
    // },
    // {
    //   ...baseCapability,
    //   "bstack:options": { ...baseCapability["bstack:options"], deviceName: "iPhone 15 Pro Max", osVersion: "17.0" },
    // },
    // {
    //   ...baseCapability,
    //   "bstack:options": { ...baseCapability["bstack:options"], deviceName: "iPhone 14", osVersion: "16.5" },
    // },
    {
      ...baseCapability,
      "bstack:options": { ...baseCapability["bstack:options"], deviceName: "iPhone 14 Pro Max", osVersion: "16.5" },
    },
  ],

  updateJob: false,
  specs: [
    // "../test/specs/Contributions.spec.js",
    // "../test/specs/Thoughts.spec.js",
    // "../test/specs/Login.spec.js",
    //  "../test/specs/Notification.spec.js"
    // "../test/specs/connection.spec.js"
    "../test/specs/Search.spec.js",
  ],
  exclude: [],

  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 15000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 3,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 1800000000,
  },

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "./allure-results",
        disableWebdriverStepsReporting: true, 
        disableMochaStepsReporting: false,
        useCucumberStepReporter: false,
      },
    ],
    [
      "junit",
      {
        outputDir: path,
        outputFileFormat: function (options) {
          return `results-${options.cid}.xml`;
        },
      },
    ],
  ],

  beforeSession: function (config, capabilities) {
    const deviceName = capabilities["bstack:options"].deviceName;
    const osVersion = capabilities["bstack:options"].osVersion;
    allure.addEnvironment("Device", deviceName);
    allure.addEnvironment("OS Version", osVersion);
  },

  // Hook to filter out findElement steps in the allure report
  afterCommand: async function (commandName, args, result, error) {
    // If the command is `findElement`, simply skip reporting
    if (commandName === "findElement") {
      return; // Do nothing for `findElement` commands
    }
  
    // Otherwise, proceed as usual
    if (commandName === "findElement") {
      allure.addStep(`Command: ${commandName}`, {
        status: result ? "passed" : "failed",
        details: args
      });
    }
  },
  

  afterTest: async function (test, context, { error, result }) {
    const deviceName = browser.capabilities["bstack:options"].deviceName;

    allure.addFeature(`${test.title} - ${deviceName}`);
    allure.addLabel("device", deviceName);

    if (error) {
      const screenshot = await browser.takeScreenshot();
      allure.addAttachment(
        `Screenshot - ${deviceName}`,
        Buffer.from(screenshot, "base64"),
        "image/png"
      );
    }
  },

  onComplete: async function () {
    const allureCommandline = require("allure-commandline");
    const generation = allureCommandline(["generate", "allure-results", "--clean"]);

    generation.on("exit", function (exitCode) {
      console.log(`Allure Report generated with exit code: ${exitCode}`);
    });

    // const resultFiles = fs.readdirSync(path);
    // const resultFile = resultFiles.find(
    //   (file) => file.startsWith("results-") && file.endsWith(".xml")
    // );

    // if (resultFile) {
    //   try {
    //     const token = await authenticateXray();
    //     await uploadTestResults(token, `${path}/${resultFile}`, "RD-2829");
    //   } catch (error) {
    //     console.error("Error uploading test results to Xray:", error.message);
    //   }
    // } else {
    //   console.error("Error: No JUnit result file found.");
    // }
  },
};
