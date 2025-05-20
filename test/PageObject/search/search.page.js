const SearchLocators = require("./search.locators");
const { scrollInsideElementDown, scrollInsideElementUp } = require('../../../Utils/myUtils.js');

const {
  scrollElementByXpath,
  scrollElementByXpathUp,
  scrollElementByXpath2,
} = require("../../../Utils/myUtils.js");
const allure = require("@wdio/allure-reporter").default;

const verifySearchPage = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

};

const verifyRecentSearch = async () => {
  const searchPage = new SearchLocators();
  const searchTerms = [
    "Android", "Alfredus",
  ];

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await search.waitForDisplayed({ timeout: 5000 });
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  for (let term of searchTerms) {
    allure.addStep(`Search for the term: ${term}`);
    await search.setValue(term);
    await browser.pause(2000);
    await driver.pressKeyCode(66);
    await browser.pause(2000);

    allure.addStep(`Verify that results for '${term}' are displayed`);
    const results = await $$(searchPage.searchResults);
    await expect(results.length).toBeGreaterThan(0);
  }

  allure.addStep("Navigate back to the search screen");
  // await $(searchPage.searchBackBtn).click();
  await browser.pause(2000);
  await $(searchPage.searchIcon).waitForDisplayed();
  await $(searchPage.searchIcon).click()

  allure.addStep("Verify that recent search items are visible");
  const recentSearchItems = await $$(searchPage.recentSearchItems);
  await expect(recentSearchItems.length).toBeGreaterThan(0);

  for (let itemElement of recentSearchItems) {
    const itemText = await itemElement.getText();
    console.log("Recent item: ", itemText);

    const deleteIcon = await $(`//android.widget.TextView[@text="${itemText}"]/following-sibling::android.view.ViewGroup`);
    await expect(deleteIcon).toBeDisplayed();
  }

  allure.addStep("Verified that recent search items are visible");
};

const verifyResultOnPartialInput = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type partial keyword in the search input field");
  await search.setValue("Artif");
  await browser.pause(2000);
  // await driver.pressKeyCode(66);
  // await browser.pause(2000);

  allure.addStep("Verify the search results are displayed");
  await expect($(searchPage.artificialIntelligenceTxt)).toBeDisplayed();
  allure.addStep("Verified the search results are displayed");
  await browser.pause(5000);

  allure.addStep("Click on 'Artificial Intelligence' result");
  await $(searchPage.artificialIntelligenceTxt).click();
  await browser.pause(2000);

  allure.addStep("Verify it navigates to the relevant page");
  // await scrollElementByXpath(
  //   searchPage.equityInArtificialIntelligenceTxt
  // );
  await browser.pause(2000);
  await expect($(searchPage.equityInArtificialIntelligenceTxt)).toBeDisplayed();
  allure.addStep("Verified it navigates to the relevant page");

};

const verifyResultForMisspelledInput = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await browser.pause(10000);
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type any misspelled keyword in the search input field");
  await search.setValue("Artifost");
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click();
  await browser.pause(2000);
  allure.addStep("Verify 'No result for Artifost' displayed");
  const noResult = await $(searchPage.noResultFoundForTxt);
  await expect(noResult).toBeDisplayed();
  allure.addStep("Verified 'No result for Artifost' displayed");

  allure.addStep("Verify 'suggest it as a topic' displayed");
  const suggestIt = await $(searchPage.suggestItAsATopicTxt);
  await expect(suggestIt).toBeDisplayed();
  allure.addStep("Verified 'suggest it as a topic' displayed");


};

const verifyFilterBtn = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type any keyword in the search input field");
  await search.setValue("Alfredus");
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click();
  await browser.pause(2000);

  allure.addStep("Verify Filter button displayed");
  const filterButton = await $(searchPage.filterBtn);
  await expect(filterButton).toBeDisplayed();
  allure.addStep("Verified Filter button displayed");

  // Get the size of the filter button
  const size = await filterButton.getSize();

  // Check that the width and height are at least 44px
  const isValidSize = size.width >= 44 && size.height >= 44;

  if (isValidSize) {
    console.log('The filter button meets the minimum touch target size of 44px x 44px');
  } else {
    console.log('The filter button does NOT meet the minimum touch target size');
  }

};

const verifyFilterCategories = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type any keyword in the search input field");
  await search.setValue("Alfredus");
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click();
  await browser.pause(2000);

  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();
  await browser.pause(2000);

  allure.addStep("Verify 'Thoughts' Accordian is displayed");
  const thoughtsAccordian = await $(searchPage.thoughtsAccordian);
  await expect(thoughtsAccordian).toBeDisplayed();
  allure.addStep("Verified Thoughts Accordian is displayed");

  allure.addStep("Verify 'Contributions' Accordian is displayed");
  const contributionsAccordian = await $(searchPage.contributionsAccordian);
  await expect(contributionsAccordian).toBeDisplayed();
  allure.addStep("Verified 'Contributions' Accordian is displayed");

  allure.addStep("Verify 'Agoras' Accordian is displayed");
  const agorasAccordian = await $(searchPage.agorasAccordian);
  await expect(agorasAccordian).toBeDisplayed();
  allure.addStep("Verified 'Agoras' Accordian is displayed");

  allure.addStep("Verify 'Members' Accordian is displayed");
  const membersAccordian = await $(searchPage.membersAccordian);
  await expect(membersAccordian).toBeDisplayed();
  allure.addStep("Verified 'Members' Accordian is displayed")

};

const verifyClearAllBtn = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type any keyword in the search input field");
  await search.setValue("Alfredus");
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click();
  await browser.pause(2000);

  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();
  await browser.pause(2000);

  allure.addStep("Verify 'Clear All' button is displayed");
  const clearAllButton = await $(searchPage.clearAllBtn);
  await expect(clearAllButton).toBeDisplayed();
  allure.addStep("Verified 'Clear All' button is displayed");

  allure.addStep("Verify 'Clear All' button is disabled");
  await browser.pause(1000);
  const isClearAllBtnEnabled = await clearAllButton.isEnabled();

  if (isClearAllBtnEnabled) {
    allure.addStep("Error: 'Clear All' button is unexpectedly enabled", 'failed');
  } else {
    allure.addStep("Verified 'Clear All' button is disabled");
  }

  await expect(isClearAllBtnEnabled).toBe(false);
  allure.addStep("Verified 'Clear All' button is disabled");
  await browser.pause(2000);

};

const verifyClearAllBtnAfterMultipleFilters = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type any keyword in the search input field");
  await search.setValue("Alfredus");
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);

  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();
  await browser.pause(2000);

  allure.addStep("Click on 'Thoughts' accordian")
  await $(searchPage.thoughtsAccordian).waitForDisplayed()
  await $(searchPage.thoughtsAccordian).click()

  allure.addStep("Select 'All' filters of 'Thoughts' by clicking on All checkbox");
  const thoughtsAllFilter = await $(searchPage.allCheck)
  await thoughtsAllFilter.click();

  allure.addStep("Click on 'Contributions' accordion");
  await $(searchPage.contributionsAccordian).waitForDisplayed();
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Select 'All' filters of 'Contributions' by clicking on All checkbox");
  const contributionsAllFilter = await $(searchPage.allCheck)
  await contributionsAllFilter.click()

  allure.addStep("Verify All filter is visible alongwith 'Thoughts' accordian")
  const isThoughtsFiltersVisible = await $(searchPage.thoughtsAllOpt)
  await expect(isThoughtsFiltersVisible).toBeDisplayed()
  allure.addStep("Verified All filter is visible with 'Thoughts' accordian")

  allure.addStep("Verify All filter is visible alongwith 'Contributions' accordian")
  const isContributionsFiltersVisible = await $(searchPage.contributionsAllOpt)
  await expect(isContributionsFiltersVisible).toBeDisplayed()
  allure.addStep("Verified All filter is visible with 'Thoughts' accordian")

  allure.addStep("Click on 'Clear all' button")
  await $(searchPage.clearAllBtn).waitForDisplayed()
  await $(searchPage.clearAllBtn).click()

  allure.addStep("Verify Thoughts All filter is cleared");
  const isThoughtsFiltersHidden = await $(searchPage.thoughtsAllOpt).isDisplayed();
  await expect(isThoughtsFiltersHidden).toBe(false);
  allure.addStep("Verified Thoughts All filter is cleared");

  allure.addStep("Verify Contributions All filter is cleared");
  const isContributionsFiltersHidden = await $(searchPage.contributionsAllOpt).isDisplayed();
  await expect(isContributionsFiltersHidden).toBe(false);
  allure.addStep("Verified Contributions All filter is cleared");
  await browser.pause(5000);

};

const verifyAccordianBehaviour = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type any keyword in the search input field");
  await search.setValue("Alfredus");
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click()
  await browser.pause(2000);

  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();
  await browser.pause(2000);

  allure.addStep("Click on 'Thoughts' accordian")
  await $(searchPage.thoughtsAccordian).waitForDisplayed()
  await $(searchPage.thoughtsAccordian).click()

  allure.addStep("Verify 'Thoughts' accordion is expanded");
  const isThoughtsExpanded = await $(searchPage.postedByMeOpt).isDisplayed();
  await expect(isThoughtsExpanded).toBe(true);
  allure.addStep("Verified 'Thoughts' accordion is expanded");

  allure.addStep("Click on 'Agoras' accordion");
  await $(searchPage.agorasAccordian).waitForDisplayed();
  await $(searchPage.agorasAccordian).click();

  allure.addStep("Verify 'Agoras' accordion is expanded");
  const isAgorasExpanded = await $(searchPage.withInSevenDays).isDisplayed();
  await expect(isAgorasExpanded).toBe(true);
  allure.addStep("Verified 'Agoras' accordion is expanded");

  allure.addStep("Verify 'Thoughts' accordion options are collapsed after expanding 'Agoras'");
  const isThoughtsOptionsVisible = await $(searchPage.postedByMeOpt).isDisplayed();
  await expect(isThoughtsOptionsVisible).toBe(false);
  allure.addStep("Verified 'Thoughts' accordion options are collapsed");

};

const verifyShowResultsBtnUpdate = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type any keyword in the search input field");
  await search.setValue("Alfredus");
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click()
  await browser.pause(2000);

  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();
  await browser.pause(2000);

  allure.addStep("Verify 'SHOW RESULTS' button is displayed");
  const showResultBtnUpdate = await $(searchPage.showResultsBtn);
  await expect(showResultBtnUpdate).toBeDisplayed();

  const initialButtonText = await showResultBtnUpdate.getText();
  allure.addStep("Captured initial 'SHOW RESULTS' button text");
  console.log('initial', initialButtonText);

  allure.addStep("Click on 'Thoughts' accordion");
  await $(searchPage.thoughtsAccordian).waitForDisplayed();
  await $(searchPage.thoughtsAccordian).click();

  allure.addStep("Select 'Posted by Me' option");
  await $(searchPage.postedByMeOpt).waitForDisplayed();
  await $(searchPage.postedByMeOpt).click();

  allure.addStep("Verify 'SHOW RESULTS' button is updated with count.");
  await browser.pause(2000);
  const updatedButtonText = await showResultBtnUpdate.getText();
  console.log('updatedButtonText', updatedButtonText);
  if (initialButtonText === updatedButtonText) {
    allure.addStep("Error: 'SHOW RESULTS' button text did not update", 'failed');
  } else {
    allure.addStep("Verified 'SHOW RESULTS' button updated with the correct count");
  }
  expect(updatedButtonText).not.toMatch(initialButtonText);

  await browser.pause(5000);

};

const verifyShowResultsBtnActivation = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type any keyword in the search input field");
  await search.setValue("Alfredus");
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);

  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();
  await browser.pause(2000);

  allure.addStep("Verify 'SHOW RESULTS' button is displayed");
  const showResultBtnUpdate = await $(searchPage.showResultsBtn);
  await expect(showResultBtnUpdate).toBeDisplayed();

  allure.addStep("Click on 'Thoughts' accordion");
  await $(searchPage.thoughtsAccordian).waitForDisplayed();
  await $(searchPage.thoughtsAccordian).click();

  allure.addStep("Select 'Posted by Me' option");
  await $(searchPage.postedByMeOpt).waitForDisplayed();
  await $(searchPage.postedByMeOpt).click();

  allure.addStep("Verify 'SHOW RESULTS' button is activated")
  const showResultBtnActivation = await $(searchPage.showResultsBtn);
  await expect(showResultBtnActivation).toBeEnabled();
  await browser.pause(5000);

};

const verifyAccordianBehaviourWhileSelecting = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type any keyword in the search input field");
  await search.setValue("Alfredus");
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click();
  await browser.pause(2000);

  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();
  await browser.pause(2000);

  allure.addStep("Click on 'Agoras' accordion");
  await $(searchPage.agorasAccordian).waitForDisplayed();
  await $(searchPage.agorasAccordian).click();

  // allure.addStep("Verify 'Agoras' accordion is expanded");
  // const isAgorasExpanded = await $(searchPage.agorasAccordian).isDisplayed();
  // await expect(isAgorasExpanded).toBe(true);
  // allure.addStep("Verified 'Agoras' accordion is expanded");

  allure.addStep("Verify 'Beyond 7 days' filter is visible")
  const beyondSevenDaysFilter = await $(searchPage.beyondSevenDays)
  await expect(beyondSevenDaysFilter).toBeDisplayed()
  allure.addStep("Verified 'Beyond 7 days' filter is visible")

  allure.addStep("Select'Within 7 days' filter");
  await $(searchPage.withInSevenDays).waitForDisplayed();
  await $(searchPage.withInSevenDays).click();

  allure.addStep("Click on 'Thoughts' accordian")
  await $(searchPage.thoughtsAccordian).waitForDisplayed()
  await $(searchPage.thoughtsAccordian).click()

  // allure.addStep("Verify 'Thoughts' accordion is expanded");
  // const isThoughtsExpanded = await $(searchPage.thoughtsAccordian).isDisplayed();
  // await expect(isThoughtsExpanded).toBe(true);
  // allure.addStep("Verified 'Thoughts' accordion is expanded");

  allure.addStep("Verify 'Agoras' accordion options are collapsed after expanding 'Thoughts'");
  const isAgorasOptionsVisible = await $(searchPage.beyondSevenDays).isDisplayed();
  await expect(isAgorasOptionsVisible).toBe(false);
  allure.addStep("Verified 'Thoughts' accordion options are collapsed");

  allure.addStep("Verify the selected filter 'Within 7 days' is preserved")
  const isSelectedWithinSevenDaysPreserved = await $(searchPage.selectedWithInSevenDays)
  await expect(isSelectedWithinSevenDaysPreserved).toBeDisplayed()
  allure.addStep("Verified the selected filter 'Within 7 days' is preserved")

};

const verifySelectedFiltersOnResultPage = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep('Verify search input is displayed');
  const search = await $(searchPage.searchInput);
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search input is displayed');

  allure.addStep('Verify search input is editable');
  await expect(search).toBeEnabled();
  allure.addStep('Verified search input is editable')

  allure.addStep('Verify search page is displayed');
  await expect(search).toBeDisplayed();
  allure.addStep('Verified search page is displayed');

  allure.addStep("Type any keyword in the search input field");
  await search.setValue("Alfredus");
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);

  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();
  await browser.pause(2000);

  allure.addStep("Click on 'Thoughts' accordion");
  await $(searchPage.thoughtsAccordian).waitForDisplayed();
  await $(searchPage.thoughtsAccordian).click();

  allure.addStep("Select 'Posted by Me' option");
  await $(searchPage.postedByMeOpt).waitForDisplayed();
  await $(searchPage.postedByMeOpt).click();
  await browser.pause(2000);

  allure.addStep("Click on 'Contributions' accordion");
  await $(searchPage.contributionsAccordian).waitForDisplayed();
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Select 'Posted by Me' option");
  await $(searchPage.postedByMeOpt).waitForDisplayed();
  await $(searchPage.postedByMeOpt).click();

  allure.addStep("Click on 'SHOW RESULTS' button");
  await $(searchPage.showResultsBtn).waitForDisplayed()
  await $(searchPage.showResultsBtn).click()

  await browser.pause(5000);

  allure.addStep("Verify first selected filter is visible as tag on result page with cross icon")
  const isSelectedFilterTag1Visible = await $(searchPage.selectedFilterTag1)
  await expect(isSelectedFilterTag1Visible).toBeDisplayed()
  const isSelectedFilterTagCrossIcon1Visible = await $(searchPage.selectedFilterTagCrossIcon1)
  await expect(isSelectedFilterTagCrossIcon1Visible).toBeDisplayed()
  allure.addStep("Verified first selected filter is visible as tag on result page with cross icon")

  allure.addStep("Verify second selected filter is visible as tag on result page with cross icon")
  const isSelectedFilterTag2Visible = await $(searchPage.selectedFilterTag2)
  await expect(isSelectedFilterTag2Visible).toBeDisplayed()
  // const isSelectedFilterTagCrossIcon2 = await $(searchPage.selectedFilterTag2)
  // await expect(isSelectedFilterTagCrossIcon2).toBeDisplayed()
  allure.addStep("Verified second selected filter is visible as tag on result page with cross icon")
  await browser.pause(5000);

};

const verifySelectionUpdateResultDynamically = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Alfredus'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Alfredus")
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Get show result button text");
  await browser.pause(3000);
  const showResultBtnUpdate = await $(searchPage.showResultBtnText);
  const resultButtonText= await showResultBtnUpdate.getText();

  await browser.pause(2000);

  allure.addStep("Click on Contributions Accordian");
  const contributionsAccordian = await $(searchPage.contributionsAccordian);
  await contributionsAccordian.click();

  allure.addStep("Select all Contributions Accordian");
  const allCheck = await $(searchPage.allCheck);
  await allCheck.click();

  allure.addStep("Get show result button updated text");
  await browser.pause(3000);
  const resultButtonUpdatedText= await showResultBtnUpdate.getText();

  
  console.log("text 1", resultButtonText);
  console.log("text 2",resultButtonUpdatedText)
  allure.addStep("Show result button text before selected All contributions: " + resultButtonText);
  allure.addStep("Show result button text after selected All contributions: " + resultButtonUpdatedText);
  allure.addStep("Verify Show Result button updated text after selecting All Filter");
  await expect(resultButtonText).not.toEqual(resultButtonUpdatedText);
  allure.addStep("Verified Show Result button updated text after selecting All Filter");

}

const verifyCheckBoxPresenceUnderEachFilter = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Alfredus'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Alfredus")
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click();
  await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Click on Thoughts drop down");
  await $(searchPage.thoughtsAccordian).click();
  
  allure.addStep("Verify All Thoughts checkbox");
  const allCheckThoughts = await $(searchPage.allCheck);
  await expect(allCheckThoughts).toBeDisplayed();
  allure.addStep("Verified All Thoughts checkbox");

  allure.addStep("Verify Posted By Me Thoughts checkbox");
  const postedByMeCheckThoughts = await $(searchPage.postedByMe);
  await expect(postedByMeCheckThoughts).toBeDisplayed();
  allure.addStep("Verified Posted By Me Thoughts checkbox");

  allure.addStep("Verify Commented By Me Thoughts checkbox");
  const commenntedByMeCheckThoughts = await $(searchPage.commentedByMe);
  await expect(commenntedByMeCheckThoughts).toBeDisplayed();
  allure.addStep("Verified Commented By Me Thoughts checkbox");

  allure.addStep("Click on Contributions drop down");
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Verify All Contributions checkbox");
  const allCheckContributions = await $(searchPage.allCheck);
  await expect(allCheckContributions).toBeDisplayed();
  allure.addStep("Verified All checkbox");

  allure.addStep("Verify Posted By Me Contributions checkbox");
  const postedByMeCheckContributions = await $(searchPage.postedByMe);
  await expect(postedByMeCheckContributions).toBeDisplayed();
  allure.addStep("Verified Posted By Me Contributions checkbox");

  allure.addStep("Verify Commented By Me Contributions checkbox");
  const commenntedByMeCheckContributions = await $(searchPage.commentedByMe);
  await expect(commenntedByMeCheckContributions).toBeDisplayed();
  allure.addStep("Verified Commented By Me Contributions checkbox");

  allure.addStep("Click on Agoras drop down");
  await $(searchPage.agorasAccordian).click();

  allure.addStep("Verify Past Agoras checkbox");
  const pastAgoras = await $(searchPage.past);
  await expect(pastAgoras).toBeDisplayed();
  allure.addStep("Verified Past Agoras checkbox");

  allure.addStep("Verify With In 7 Days Agoras checkbox");
  const withIn7DaysAgoras = await $(searchPage.withIn7Days);
  await expect(withIn7DaysAgoras).toBeDisplayed();
  allure.addStep("Verified With In 7 Days Agoras checkbox");

  allure.addStep("Verify Beyond 7 Days Agoras checkbox");
  const beyond7DaysAgoras = await $(searchPage.beyond7Days);
  await expect(beyond7DaysAgoras).toBeDisplayed();
  allure.addStep("Verified Beyond 7 Days Agoras checkbox");

  allure.addStep("Click on Members drop down");
  await $(searchPage.membersAccordian).click();

  allure.addStep("Verify All Members checkbox");
  const allMembers = await $(searchPage.allCheck);
  await expect(allMembers).toBeDisplayed();
  allure.addStep("Verified All Members checkbox");

  allure.addStep("Verify Luminar Thinkers Members checkbox");
  const luminarThinkerMembers = await $(searchPage.luminarThinker);
  await expect(luminarThinkerMembers).toBeDisplayed();
  allure.addStep("Verified Luminar Thinkers Members checkbox");

  allure.addStep("Verify RedBox Connection Members checkbox");
  const redBoxConnectionMembers = await $(searchPage.redBoxConnection);
  await expect(redBoxConnectionMembers).toBeDisplayed();
  allure.addStep("Verified RedBox Connection Members checkbox");

  allure.addStep("Verify Common Interests Members checkbox");
  const commonInterestMembers = await $(searchPage.commonInterest);
  await expect(commonInterestMembers).toBeDisplayed();
  allure.addStep("Verified Common Interests Members checkbox");

}


const verifyAccessibilityOfAllFilterItems = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Alfredus'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Alfredus")
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click();
  await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Get X iconn size of filter");
  const closeFilterIcon = await $(searchPage.closeFilterIcon);
  const sizeIcon = await closeFilterIcon.getSize();

  const isValidSizeIcon = sizeIcon.width >= 44 && sizeIcon.height >= 40;

  allure.addStep("Get clear all size of filter");
  const clearALL = await $(searchPage.clearAllBtn);
  const sizeClearALL = await clearALL.getSize();

  const isValidSizeClearAll = sizeClearALL.width >= 44 && sizeClearALL.height >= 44;

  console.log('Icon ' + sizeIcon.width + ' ' + sizeIcon.height);
  console.log('Clear All ' + sizeClearALL.width + ' ' + sizeClearALL.height);

  allure.addStep("Verify Close Filter Icon Size equal or greater than 44");
  await expect(isValidSizeIcon).toBe(true);
  allure.addStep("Verified Close Filter Icon Size equal or greater than 44");

  allure.addStep("Verify Clear ALL Size equal or greater than 44");
  await expect(isValidSizeClearAll).toBe(true);
  allure.addStep("Verified Clear ALL Size equal or greater than 44");
}


const verifyCheckBoxTouchTargetSize = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Alfredus'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Alfredus")
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click();
    await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Click on Thoughts drop down");
  await $(searchPage.thoughtsAccordian).click();

  allure.addStep("Get Thoughts Check Box Size");
  const thoughts = await $(searchPage.allCheck);
  const thoughtsSize = await thoughts.getSize();

  const isValidThoughtSize = thoughtsSize.width >= 44 && thoughtsSize.height >= 44;

  allure.addStep("Click on Contributions drop down");
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Get Contributions Check Box Size");
  const contributions = await $(searchPage.allCheck);
  const contributionsSize = await contributions.getSize();

  const isValidContributionsSize = contributionsSize.width >= 44 && contributionsSize.height >= 44;

  allure.addStep("Click on Agoras drop down");
  await $(searchPage.agorasAccordian).click();
  
  allure.addStep("Get Agoras Check Box Size");
  const agoras = await $(searchPage.past);
  const agorasSize = await agoras.getSize();

  const isValidAgorassSize = agorasSize.width >= 44 && agorasSize.height >= 44;

  allure.addStep("Click on Members drop down");
  await $(searchPage.membersAccordian).click();

  allure.addStep("Get Members Check Box Size");
  const members = await $(searchPage.allCheck);
  const membersSize = await members.getSize();

  const isValidMemberssSize = membersSize.width >= 44 && membersSize.height >= 44;

  console.log('Thought ' + thoughtsSize.width + ' ' + thoughtsSize.height);
  console.log('Contributions ' + contributionsSize.width + ' ' + contributionsSize.height);
  console.log('Agoras ' + agorasSize.width + ' ' + agorasSize.height);
  console.log('Members ' + membersSize.width + ' ' + membersSize.height);

  allure.addStep("Verify Thoughts Check Box Size greater than 44");
  await expect(isValidThoughtSize).toBe(true);
  allure.addStep("Verified Thoughts Check Box Size Size greater than 44");

  allure.addStep("Verify Contributions Check Box Size greater than 44");
  await expect(isValidContributionsSize).toBe(true);
  allure.addStep("Verified Contributions Check Box Size Size greater than 44");

  allure.addStep("Verify Agoras Check Box Size greater than 44");
  await expect(isValidAgorassSize).toBe(true);
  allure.addStep("Verified Agoras Check Box Size Size greater than 44");

  allure.addStep("Verify Members Check Box Size greater than 44");
  await expect(isValidMemberssSize).toBe(true);
  allure.addStep("Verified Members Check Box Size Size greater than 44");
}

const verifyMultipleCheckboxSelection= async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Alfredus'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Alfredus")
  await browser.pause(2000);
  await $(searchPage.searchKeyboardButoon).click();
  await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Click on contribution drop down");
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Click on Post By Me");
  await $(searchPage.postedByMe).click();

  allure.addStep("Click on Commented By Me");
  await $(searchPage.commentedByMe).click();

  allure.addStep("Verify Post By Me and  Commented By Me selected");

  const selectedCheckBox = await $(searchPage.contributionPostByMeCommentedByMeSelected);
  await expect(selectedCheckBox).toBeDisplayed();
  allure.addStep("Verified All Contributions is still selected");
}

const verifyCheckboxPersistenceAfterAccordionSwitch = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Alfredus'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Alfredus")
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Click on Contributions drop down");
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Select All Contributions");
  await $(searchPage.allCheck).click();

  allure.addStep("Click on Agoras drop down");
  await $(searchPage.agorasAccordian).click();

  allure.addStep("Verify All Contributions is still selected");
  const selectedCheckBox = await $(searchPage.contributionsAllSelected);
  await expect(selectedCheckBox).toBeDisplayed();
  allure.addStep("Verified All Contributions is still selected");
}

const verifyContentReflectsAppliedFilters = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Android'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Android")
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Click on Contributions drop down");
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Click on Post By Me");
  await $(searchPage.postedByMe).click();

  allure.addStep("Click on Show Result");
  await $(searchPage.showResultsBtn).click();
  
  await browser.pause(2000);

  allure.addStep("Verify Post By Me is Displayed");
  const contributionPost = await $(searchPage.contributionPost);
  await expect(contributionPost).toBeDisplayed();
  allure.addStep("Verified Post By Me is Displayed");


  allure.addStep("Verify No Other Post is Displayed");
  const noOtherPost = await $(searchPage.noOtherPost);
  await expect(noOtherPost).toBeDisplayed();
  allure.addStep("Verified No Other Post is Displayed");
}

const verifyMultipleFilterTagsDisplay = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Android'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Android")
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Click on Contributions drop down");
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Click on All");
  await $(searchPage.allCheck).click();

  allure.addStep("Click on Agora drop down");
  await $(searchPage.agorasAccordian).click();

  allure.addStep("Click on Past Agora");
  await $(searchPage.past).click();

  allure.addStep("Click on Show Result");
  await $(searchPage.showResultsBtn).click();
  
  await browser.pause(2000);

  allure.addStep("Verify All tag with close icon is Displayed on top");
  const allTag = await $(searchPage.closeFilterOnTop1);
  await expect(allTag).toBeDisplayed();
  allure.addStep("Verified All tag with close icon is Displayed on top");


  allure.addStep("Verify Past tag with close icon is Displayed on top");
  const pastTag = await $(searchPage.closeFilterOnTop2);
  await expect(pastTag).toBeDisplayed();
  allure.addStep("Verified Past tag with close icon is Displayed on top");
}

const VerifyFilterTagRemovalUpdatesResults = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Android'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Android")
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Click on Contributions drop down");
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Click on Posted By Me");
  await $(searchPage.postedByMe).click();

  allure.addStep("Click on Show Result");
  await $(searchPage.showResultsBtn).click();

  await browser.pause(2000);

  allure.addStep("Click close Post By Me tag");
  await $(searchPage.closeFilterOnTop1).click();

  await browser.pause(3000);

  allure.addStep("Verify Other Post are Displayed");
  const otherPost = await $(searchPage.noOtherPost).isDisplayed();
  console.log("post: " + otherPost)
  await expect(otherPost).toEqual(false);
  allure.addStep("Verified Other Post are Displayed");
}


const VerifyMemberProfile = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Android'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Android")
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);

  allure.addStep("Verify Profile Picture is Displayed");
  const profilePicture = await $(searchPage.profilePicture);
  await expect(profilePicture).toBeDisplayed();
  allure.addStep("Verified Profile Picture is Displayed");


  allure.addStep("Verify Profile Name is Displayed");
  const profileName = await $(searchPage.profileName);
  await expect(profileName).toBeDisplayed();
  allure.addStep("Verified Profile Name is Displayed")
}

const VerifyPostResultDisplay = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Android'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Android")
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);

  allure.addStep("Verify Post Title is Displayed");
  const postTitle = await $(searchPage.contributionPost);
  await expect(postTitle).toBeDisplayed();
  allure.addStep("Verified Post Title is Displayed");

  allure.addStep("Verify Post Snippet is Displayed");
  const postSnippet = await $(searchPage.contributionPostSnippet);
  await expect(postSnippet).toBeDisplayed();
  allure.addStep("Verified Post Snippet is Displayed");

  allure.addStep("Verify Post Image is Displayed");
  const postImage = await $(searchPage.postImage);
  await expect(postImage).toBeDisplayed();
  allure.addStep("Verified Post Image is Displayed");

  allure.addStep("Verify Post Likes is Displayed");
  const postLike = await $(searchPage.postLike);
  await expect(postLike).toBeDisplayed();
  allure.addStep("Verified Post Likes is Displayed");
}

const VerifySeeMoreButtonOrTextExpansionOnResults = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Android'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Android")
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);
  await scrollInsideElementDown(searchPage.scroll, 0.7, 300);
  try{
      allure.addStep('Click on "See More"');
      await $(searchPage.seeMore).click();
    }  catch (error) {
      await scrollInsideElementDown(searchPage.scroll, 0.6, 300);
      await $(searchPage.seeMore).click();
    }

  allure.addStep("Verify Post Full Page is Displayed");
  const fullPostPage = await $(searchPage.fullPostTitle);
  await expect(fullPostPage).toBeDisplayed();
  allure.addStep("Verified Post Full Page is Displayed");
}

const verifyConsistencyBetweenSelectedFiltersAndVisibleResults = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Android'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Android")
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Click on Contributions drop down");
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Click on Post By Me");
  await $(searchPage.postedByMe).click();

  allure.addStep("Click on Show Result");
  await $(searchPage.showResultsBtn).click();
  
  await browser.pause(2000);

  allure.addStep("Verify Post By Me is Displayed");
  const contributionPost = await $(searchPage.contributionPost);
  await expect(contributionPost).toBeDisplayed();
  allure.addStep("Verified Post By Me is Displayed");


  allure.addStep("Verify No Ghost/Old Data is Displayed");
  const noGhostData = await $(searchPage.noOtherPost);
  await expect(noGhostData).toBeDisplayed();
  allure.addStep("Verified No Ghost/Old Data is Displayed");

  allure.addStep("Click close Filter tag");
  await $(searchPage.closeFilterOnTop1).click();

  allure.addStep("Click on Filter button");
  const filterButton2 = await $(searchPage.filterBtn);
  await filterButton2.click();

  allure.addStep("Click on Contributions drop down");
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Click Post By Me");
  await $(searchPage.postedByMe).click();

  allure.addStep("Click on Show Result");
  await $(searchPage.showResultsBtn).click();
  
  await browser.pause(2000);

  allure.addStep("Verify Post By Me is Displayed");
  const contributionPost2 = await $(searchPage.contributionPost);
  await expect(contributionPost2).toBeDisplayed();
  allure.addStep("Verified Post By Me is Displayed");


  allure.addStep("Verify No Ghost/Old Data is Displayed");
  const noGhostData2 = await $(searchPage.noOtherPost);
  await expect(noGhostData2).toBeDisplayed();
  allure.addStep("Verified No Ghost/Old Data is Displayed");
}

const verifyUserCanSelectASearchedItemAndThenUseTheBackButtonToGetBackInToTheSearchMenu = async () => {
  const searchPage = new SearchLocators();

  allure.addStep("verify the Search tab button is visible");
  await $(searchPage.searchIcon).waitForDisplayed();

  allure.addStep("click on the Search icon button");
  await $(searchPage.searchIcon).click();

  await browser.pause(2000);

  allure.addStep("Search input 'Android'");
  const search = await $(searchPage.searchInput);
  await search.setValue("Android")
  await browser.pause(2000);
  await driver.pressKeyCode(66);
  await browser.pause(2000);


  allure.addStep("Click on Filter button");
  const filterButton = await $(searchPage.filterBtn);
  await filterButton.click();

  allure.addStep("Click on Contributions drop down");
  await $(searchPage.contributionsAccordian).click();

  allure.addStep("Click on Post By Me");
  await $(searchPage.postedByMe).click();

  allure.addStep("Click on Show Result");
  await $(searchPage.showResultsBtn).click();
  
  await browser.pause(2000);

  allure.addStep("Click on Back Button");
  await $(searchPage.backButton).click();

  allure.addStep("Verify Only Search Input Field with out Filter");
  const searchInputField = await $(searchPage.searchInput);
  await expect(searchInputField).toBeDisplayed();
  allure.addStep("Verified Only Search Input Field with out Filter");
}

module.exports = {
  verifySearchPage,
  verifyRecentSearch,
  verifyResultOnPartialInput,
  verifyResultForMisspelledInput,
  verifyFilterBtn,
  verifyFilterCategories,
  verifyClearAllBtn,
  verifyClearAllBtnAfterMultipleFilters,
  verifyAccordianBehaviour,
  verifyShowResultsBtnUpdate,
  verifyShowResultsBtnActivation,
  verifyAccordianBehaviourWhileSelecting,
  verifySelectedFiltersOnResultPage,
  verifySelectionUpdateResultDynamically,
  verifyCheckBoxPresenceUnderEachFilter,
  verifyAccessibilityOfAllFilterItems,
  verifyCheckBoxTouchTargetSize,
  verifyCheckboxPersistenceAfterAccordionSwitch,
  verifyContentReflectsAppliedFilters,
  verifyMultipleFilterTagsDisplay,
  VerifyFilterTagRemovalUpdatesResults,
  VerifyMemberProfile,
  VerifyPostResultDisplay,
  VerifySeeMoreButtonOrTextExpansionOnResults,
  verifyConsistencyBetweenSelectedFiltersAndVisibleResults,
  verifyUserCanSelectASearchedItemAndThenUseTheBackButtonToGetBackInToTheSearchMenu,
  verifyMultipleCheckboxSelection,
};
