import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../base-page';

export class SwagLabsCheckout extends BasePage {
    readonly checkoutButton: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly completeHeader: Locator;

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/cart.html');

        this.checkoutButton = this.page.locator('button#checkout');
        this.firstName = this.page.locator('input#first-name');
        this.lastName = this.page.locator('input#last-name');
        this.postalCode = this.page.locator('input#postal-code');
        this.continueButton = this.page.locator('input#continue');
        this.finishButton = this.page.locator('button#finish');
        this.completeHeader = this.page.locator(
            'h2[data-test="complete-header"]',
        );
    }

    async provideBillingInfo() {
        const billingInfo: {
            firstName: string;
            lastName: string;
            postalCode: string;
        } = await this.readJSONFile(
            `${process.cwd()}/test/resources/billing-info.json`,
        );
        await this.firstName.fill(billingInfo.firstName);
        await this.lastName.fill(billingInfo.lastName);
        await this.postalCode.fill(billingInfo.postalCode);
    }
}
