import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class SwagLabs extends BasePage {
    private usernameInput: Locator;
    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/inventory.html');
        this.usernameInput = this.page.locator('#user-name');
    }
}
