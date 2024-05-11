import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class SeleniumTutorial extends BasePage {
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page, 'https://www.guru99.com/selenium-tutorial.html');

        this.submitButton = this.page.locator('input[name="submit"]');
    }
}
