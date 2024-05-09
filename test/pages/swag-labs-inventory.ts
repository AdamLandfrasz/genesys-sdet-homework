import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class SwagLabsInventory extends BasePage {
    shoppingCart: Locator;
    shoppingCartBadge: Locator;
    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/inventory.html');
        this.shoppingCart = this.page.locator('#shopping_cart_container a');
        this.shoppingCartBadge = this.page.locator(
            '#shopping_cart_container [data-test="shopping-cart-badge"]',
        );
    }

    async putItemInCart(itemName: string) {
        const itemIdName = itemName.toLowerCase().replaceAll(/\s/g, '-');
        await this.page.locator(`button#add-to-cart-${itemIdName}`).click();
        await expect(
            this.page.locator(`button#remove-${itemIdName}`),
        ).toHaveText('Remove');
    }
}
