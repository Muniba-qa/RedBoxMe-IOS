const LoginPage = require('./Login.locators.js');
const allure = require('@wdio/allure-reporter').default;
const emailUtils = require('../../../utils/emailUtils.js');

const Login = async () => {
   await browser.pause(5000);

   allure.addStep("Click on the 'I AM A MEMBER' button");
   await $(LoginPage.iAmAMemberBtn).waitForDisplayed();
   await $(LoginPage.iAmAMemberBtn).click();

   allure.addStep("Enter an Email in the Email field");
   await $(LoginPage.loginEmailField).waitForDisplayed();
   await $(LoginPage.loginEmailField).clearValue();
   await $(LoginPage.loginEmailField).setValue(process.env.LOGIN_EMAIL);
   
   allure.addStep("Click on the send code Button");
   await $(LoginPage.sendCodeBtn).waitForDisplayed();
   await $(LoginPage.sendCodeBtn).click();

   await browser.pause(5000);
   allure.addStep('Fetching OTP from email.');
   const otp = await emailUtils.getEmailVerificationCode();
   await browser.pause(1000);

   allure.addStep('Input OTP into code fields.');
   if (otp) {
     const otpArray = otp.split('');
     await $(LoginPage.otpInput1).setValue(otpArray[0]);
     await browser.pause(200);
     await $(LoginPage.otpInput1).setValue(otpArray[1]);
     await browser.pause(200);
     await $(LoginPage.otpInput1).setValue(otpArray[2]);
     await browser.pause(200);
     await $(LoginPage.otpInput1).setValue(otpArray[3]);
     await browser.pause(200);
     await $(LoginPage.otpInput1).setValue(otpArray[4]);
     await browser.pause(200);
   }

   allure.addStep("clickon the submit verification code button");
   await $(LoginPage.submitVerificationCodeBtn).waitForDisplayed();
   await $(LoginPage.submitVerificationCodeBtn).click();

   allure.addStep("Verify user redirect to the home page");
   await $(LoginPage.plusBtn).waitForDisplayed();
   
}

const Logout = async () => {

   allure.addStep("Click on the menu button");
   await $(LoginPage.menuBtn).waitForDisplayed();
   await $(LoginPage.menuBtn).click();

   allure.addStep("Click on the Dashboard Option from menu");
   await $(LoginPage.dashboardBtn).waitForDisplayed();
   await $(LoginPage.dashboardBtn).click();

   allure.addStep("Click on the Logout button from the Dashboard Page");
   await browser.pause(3000);
   let logout_btn = await $(LoginPage.logoutBtn);
   await logout_btn.scrollIntoView();
   await $(LoginPage.logoutBtn).click();

   await browser.pause(6000);

}

module.exports = {
   Login,
   Logout
}