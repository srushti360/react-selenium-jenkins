const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function testReactApp() {
    let options = new chrome.Options();

    // Run Chrome in headless mode so Jenkins can execute the test
    // without opening a visible browser window.
    options.addArguments("--headless=new");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--window-size=1920,1080");

    let driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    try {
        // Open the React application
        await driver.get("http://localhost:3000");

        // Verify the heading
        let heading = await driver.findElement(By.css("h1"));
        let headingText = await heading.getText();

        if (headingText !== "React Selenium Jenkins Demo") {
            throw new Error("Heading text is incorrect");
        }

        // Find and click the button
        let button = await driver.findElement(By.id("testButton"));
        await button.click();

        console.log("React application test PASSED");

    } catch (error) {
        console.error("React application test FAILED");
        console.error(error);
        process.exitCode = 1;

    } finally {
        await driver.quit();
    }
})(); 