import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../base-page';

export class SwagLabsLanding extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com');

        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
        this.errorMessage = this.page.locator('h3[data-test="error"]');
    }

    async logInWithCredentials(username?: string, password?: string) {
        const credentials: { username: string; password: string } =
            await this.readJSONFile(
                `${process.cwd()}/test/resources/credentials.json`,
            );
        await this.usernameInput.fill(username ?? credentials.username);
        await this.passwordInput.fill(password ?? credentials.password);
        await this.loginButton.click();
    }
}
