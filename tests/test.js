const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function testReactApp() {
    let driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options())
        .build();

    try {
        await driver.get("http://localhost:3000");

        // Verify the heading
        let heading = await driver.findElement(
            By.css("h1")
        );

        let headingText = await heading.getText();

        if (headingText !== "React Selenium Jenkins Demo") {
            throw new Error("Heading text is incorrect");
        }

        // Find and click the button
        let button = await driver.findElement(
            By.id("testButton")
        );

        await button.click();

        console.log("React application test PASSED");
    } finally {
        await driver.quit();
    }
})();