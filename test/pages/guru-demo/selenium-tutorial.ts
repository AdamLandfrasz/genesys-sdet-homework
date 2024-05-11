import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class SeleniumTutorial extends BasePage {
    readonly submitButton: Locator;
    readonly privacyAcceptButton: Locator;
    readonly learnSeleniumForm: Locator;

    constructor(page: Page) {
        super(page, 'https://www.guru99.com/selenium-tutorial.html');

        this.submitButton = this.page.locator('input[name="submit"]');
        this.privacyAcceptButton = this.page
            .frameLocator('iframe[title="SP Consent Message"]')
            .getByLabel('Accept');
        this.learnSeleniumForm = this.page.locator('form', {
            hasText: /Learn Selenium In 7 Days!/,
        });
    }
}
