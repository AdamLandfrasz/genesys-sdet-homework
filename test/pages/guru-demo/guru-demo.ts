import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class GuruDemo extends BasePage {
    readonly gdprAcceptButton: Locator;
    readonly iframeImage: Locator;
    readonly testingMenuItem: Locator;
    readonly seleniumLink: Locator;
    readonly closeAdButton: Locator;

    constructor(page: Page) {
        super(page, 'https://demo.guru99.com/test/guru99home/');
        this.gdprAcceptButton = this.page
            .frameLocator('#gdpr-consent-notice')
            .locator('button', { hasText: 'Accept All' });
        this.iframeImage = this.page
            .frameLocator('#a077aa5e')
            .locator('img[src="Jmeter720.png"]');
        this.testingMenuItem = this.page.locator('#rt-header ul.l1 > li > a', {
            hasText: /Testing/,
        });
        this.seleniumLink = this.page
            .locator('#rt-header')
            .getByRole('link', { name: 'Selenium', exact: true });
        this.closeAdButton = this.page
            .frameLocator('iframe[title="3rd party ad content"]')
            .frameLocator('iframe#ad_iframe')
            .getByLabel('Close ad');
    }
}
