import { test, expect } from '@playwright/test';
import { SwagLabsLanding } from '../test/pages/swag-labs-landing';
import { SwagLabsInventory } from '../test/pages/swag-labs-inventory';

test.describe('Automated Purchase Process', () => {
    test('log in with credentials and go through check out process', async ({
        page,
    }) => {
        const swagLabsLanding = new SwagLabsLanding(page);
        await swagLabsLanding.goto();
        await expect(page).toHaveTitle(/Swag Labs/);
        await swagLabsLanding.logInWithCredentials();
        await expect(page).toHaveURL(/inventory.html/);

        const swagLabsInventory = new SwagLabsInventory(page);
        await swagLabsInventory.putItemInCart('Sauce Labs Backpack');
        await swagLabsInventory.putItemInCart('Sauce Labs Fleece Jacket');
        await expect(swagLabsInventory.shoppingCartBadge).toHaveText('2');

        await swagLabsInventory.shoppingCart.click();
        await expect(page).toHaveURL(/cart.html/);
    });
});
