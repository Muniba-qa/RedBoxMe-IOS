

async function scrollElementByXpath2(elementSelector, duration = 650) {
    let elementVisible = false;

    while (!elementVisible) {
        const element = await $(elementSelector);

        try {
            await element.waitForDisplayed({ timeout: 2000, reverse: false });
            elementVisible = true;
        } catch (e) {
            await browser.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: 0, y: 1000 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 200 },
                    { type: 'pointerMove', duration, x: 0, y: -600 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);

            await browser.releaseActions();

            await browser.pause(1000);
        }
    }
}

async function scrollHorizontalViewToLeft(elementSelector) {
    const scrollView = await $(elementSelector);

    await browser.swipe({
        direction: 'left',
        duration: 5000,                   
        percent: 0.8,                      
        scrollableElement: $(scrollView),  
    })
}

async function scrollInsideElementUp(elementSelector) {
    const scrollView = await $(elementSelector);

    await browser.swipe({
        direction: 'up',
        duration: 5000,                   
        percent: 0.3,                      
        scrollableElement: $(scrollView),  
    })

}
async function scrollHorizontalViewToLeftFast(elementSelector) {
    const scrollView = await $(elementSelector);

    await browser.swipe({
        direction: 'left',
        duration: 5000,                   
        percent: 0.8,                      
        scrollableElement: $(scrollView),  
    })

}

async function scrollInsideElementDown(elementSelector, scrollRatio = 0.4, duration = 200) {
    const element = await $(elementSelector);
    const { x, y } = await element.getLocation();
    const { width, height } = await element.getSize();
    const midpoint = {
        x: Math.floor(width * 0.5),
        y: Math.floor(height * 0.5),
    };

    let startPoint, endPoint;
    // Adjust the startPoint to the middle of the element, but subtract scrollRatio for upward scrolling
    startPoint = { x: x + midpoint.x, y: y + midpoint.y + (midpoint.y * scrollRatio) };
    // Adjust the endPoint to the middle of the element, but add scrollRatio for upward scrolling
    endPoint = { x: x + midpoint.x, y: y + midpoint.y - (midpoint.y * scrollRatio) };

    await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
            { type: 'pointerMove', duration: 0, x: startPoint.x, y: startPoint.y },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 200 },
            { type: 'pointerMove', duration, origin: 'pointer', x: endPoint.x - startPoint.x, y: endPoint.y - startPoint.y },
            { type: 'pointerUp', button: 0 }
        ]
    }]);

    await driver.releaseActions();
}
async function  swipeVertically  (x, yStart, yEnd, durationOfPointerMovement) {
    await driver.performActions([
        {
            type: "pointer",
            id: "finger" + 33,
            parameters: { pointerType: "touch" },
            actions: [
                { type: "pointerMove", duration: 0, x: x, y: yStart },
                { type: "pointerDown", button: 0 },
                { type: "pause", duration: 100 },
                { type: "pointerMove", duration: durationOfPointerMovement, x: x, y: yEnd },
                { type: "pointerUp", button: 0 },
            ],
        },
    ]);
}








module.exports = {
    scrollElementByXpath2,
    scrollHorizontalViewToLeft,
    scrollInsideElementDown,
    scrollHorizontalViewToLeftFast,
    scrollInsideElementUp,
    swipeVertically
}