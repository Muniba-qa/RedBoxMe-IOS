const { 
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
} = require("../PageObject/search/search.page");
const { Login, Logout } = require('../PageObject/Login/Login.page.js');


describe('Search Tab', () => {
    beforeEach(async () => {
        // await Login();
    });

    afterEach(async () => {
        // await Logout();
        // await browser.reloadSession();
    });

    
    it('TC_001 : Verify UI elements and input functionality on Search screen (initial)', async () => {
        await verifySearchPage();
    });

    it('TC_002 : Verify recent search terms are displayed', async () => {
        await verifyRecentSearch();
    });

    it('TC_003 : Verify suggestions appear on partial input', async () => {
        await verifyResultOnPartialInput();
    });

    it('TC_004 : Verify message for search with no results', async () => {
        await verifyResultForMisspelledInput();
    });

    it('TC_005 : Verify visibility of Filter button', async () => {
        await verifyFilterBtn();
    });

    it('TC_006 : Verify Filter panel expands correctly', async () => {
        await verifyFilterCategories();
    });

    it('TC_007 : Validate “Clear All” button state', async () => {
        await verifyClearAllBtn();
    });

    it('TC_008 : Verify multiple accordion behavior', async () => {
        await verifyAccordianBehaviour();
    });
    
    it('TC_009 : Verify filter selection updates results count', async () => {
        await verifyShowResultsBtnUpdate();
    });
  

    it('TC_010 : Validate accessibility of all filter items', async () => {
        await verifyAccessibilityOfAllFilterItems();
    });
    
    
    it('TC_011 : Verify checkbox presence under each filter', async () => {
        await verifyCheckBoxPresenceUnderEachFilter();
    });

     
    it('TC_012 : Validate checkbox touch target size', async () => {
        await verifyCheckBoxTouchTargetSize();
    });
    
    it('TC_013 : Verify multiple checkbox selection', async () => {
        await verifyMultipleCheckboxSelection();
    });
    
    
    it.only('TC_014 : Validate accordion behavior while selecting', async () => {
        await verifyAccordianBehaviourWhileSelecting();
    });

    it('TC_015 : Verify "Show Results" button activation', async () => {
        await verifyShowResultsBtnActivation();
    });

    it('TC_016 : Validate checkbox persistence after accordion switch', async () => {
        await verifyCheckboxPersistenceAfterAccordionSwitch();
    });
    
    it('TC_027 : Verify selected filters are displayed on result page', async () => {
        await verifySelectedFiltersOnResultPage();
    });

    it('TC_028 : Verify content reflects applied filters', async () => {
        await verifyContentReflectsAppliedFilters();
    });

    it('TC_029 : Validate multiple filter tags display', async () => {
        await verifyMultipleFilterTagsDisplay();
    });

    it('TC_030 : Verify filter tag removal updates results', async () => {
        await VerifyFilterTagRemovalUpdatesResults();
    });

    it('TC_031 : Validate member profile results', async () => {
        await VerifyMemberProfile();
    });

    it('TC_032 : Validate article/post result display', async () => {
        await VerifyPostResultDisplay();
    });

    it('TC_033 : Verify "See More" button or text expansion on results', async () => {
        await VerifySeeMoreButtonOrTextExpansionOnResults();
    });
    
    it('TC_034 : Verify consistency between selected filters and visible results', async () => {
        await verifyConsistencyBetweenSelectedFiltersAndVisibleResults();
    });

    it('TC_035 : Verify user can select a searched item and then use the back button to get back into the search menu', async () => {
        await verifyUserCanSelectASearchedItemAndThenUseTheBackButtonToGetBackInToTheSearchMenu();
    });
    
    
    it('TC_036 : Validate “Clear All” button state', async () => {
        await verifyClearAllBtnAfterMultipleFilters();
    });

    it('TC_037 : Verify filter selection updates results DYNAMICALLY', async () => {
        await verifySelectionUpdateResultDynamically();
    });


    

})