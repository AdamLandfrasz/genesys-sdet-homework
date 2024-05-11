import { test, expect } from '@playwright/test';
import { GuruDemo } from '../test/pages/guru-demo/guru-demo';
import { SeleniumTutorial } from '../test/pages/guru-demo/selenium-tutorial';

test.describe('Navigate around guru99 demo page', () => {
    let guruDemo: GuruDemo;

    test.beforeEach(async ({ page }) => {
        guruDemo = new GuruDemo(page);
        await guruDemo.goto();
    });

    test('should open a page on new tab and navigate back', async ({
        page,
        context,
    }) => {
        await guruDemo.gdprAcceptButton.click();

        const newPage = await guruDemo.waitForNewPage(context, async () => {
            await guruDemo.iframeImage.click();
        });
        await expect(newPage).toHaveTitle(
            /Selenium Live Project: FREE Real Time Project for Practice/,
        );
        await newPage.close();

        await guruDemo.testingMenuItem.hover();
        await guruDemo.seleniumLink.click();
        await guruDemo.clickInPageCorner(); // to close google ad popup
        await expect(page).toHaveTitle(/Selenium Tutorial/);

        const seleniumTutorial = new SeleniumTutorial(page);
        await seleniumTutorial.privacyAcceptButton.click();
        await page.keyboard.press('End');
        await seleniumTutorial.learnSeleniumForm.scrollIntoViewIfNeeded();
        await expect(seleniumTutorial.submitButton).toBeVisible();
    });
});
