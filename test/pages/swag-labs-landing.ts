import { promises as fs } from 'fs';
import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class SwagLabsLanding extends BasePage {
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com');
        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
    }

    async logInWithCredentials() {
        const credentials: { username: string; password: string } = JSON.parse(
            await fs.readFile(
                `${process.cwd()}/test/resources/credentials.json`,
                'utf-8',
            ),
        );
        await this.usernameInput.fill(credentials.username);
        await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
    }
}
