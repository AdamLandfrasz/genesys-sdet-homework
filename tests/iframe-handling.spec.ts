import { test, expect } from '@playwright/test';
import { GuruDemo } from '../test/pages/guru-demo/guru-demo';
import { SeleniumTutorial } from '../test/pages/guru-demo/selenium-tutorial';

test.describe('Navigate around guru99 demo page', () => {
    test('should open a page on new tab and navigate back', async ({
        page,
        context,
    }) => {
        const guruDemo = new GuruDemo(page);
        await guruDemo.goto();
        await guruDemo.gdprAcceptButton.click();

        const pagePromise = context.waitForEvent('page');
        await guruDemo.iframeImage.click();
        const newPage = await pagePromise;
        await expect(newPage).toHaveTitle(
            /Selenium Live Project: FREE Real Time Project for Practice/,
        );
        await newPage.close();

        await guruDemo.testingMenuItem.hover();
        await guruDemo.seleniumLink.click();
        await guruDemo.closeAdButton.click();
        await expect(page).toHaveTitle(/Selenium Tutorial/);

        const seleniumTutorial = new SeleniumTutorial(page);
        await page.keyboard.press('End');
        await expect(seleniumTutorial.submitButton).toBeVisible();
    });
});
