import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class SwagLabsLanding extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com');
        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
    }

    async logInWithCredentials() {
        const credentials: { username: string; password: string } =
            await this.readJSONFile(
                `${process.cwd()}/test/resources/credentials.json`,
            );
        await this.usernameInput.fill(credentials.username);
        await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
    }
}
