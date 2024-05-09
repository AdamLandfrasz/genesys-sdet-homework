import { test, expect } from '@playwright/test';
import { SwagLabsLanding } from '../test/pages/swag-labs-landing';
import { SwagLabsInventory } from '../test/pages/swag-labs-inventory';
import { SwagLabsCheckout } from '../test/pages/swag-labs-checkout';

test.describe('Automated Purchase Process', () => {
    test('log in and go through check out', async ({ page }) => {
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

        const swagLabsCheckout = new SwagLabsCheckout(page);
        await swagLabsCheckout.checkoutButton.click();
        await expect(page).toHaveURL(/checkout-step-one.html/);
        await swagLabsCheckout.provideBillingInfo();
        await swagLabsCheckout.continueButton.click();
        await expect(page).toHaveURL(/checkout-step-two.html/);
        await swagLabsCheckout.finishButton.click();
        await expect(page).toHaveURL(/checkout-complete.html/);
        await expect(swagLabsCheckout.completeHeader).toBeVisible();
        await expect(swagLabsCheckout.completeHeader).toHaveText(
            'Thank you for your order!',
        );
    });

    test('should show error for mandatory fields', async ({ page }) => {
        const swagLabsLanding = new SwagLabsLanding(page);
        await swagLabsLanding.goto();
        await expect(page).toHaveTitle(/Swag Labs/);
        await swagLabsLanding.loginButton.click();
        await expect(swagLabsLanding.errorMessage).toBeVisible();
        await expect(swagLabsLanding.errorMessage).toHaveText(
            'Epic sadface: Username is required',
        );
        await swagLabsLanding.logInWithCredentials(
            'standard_user',
            'secret_sauce',
        );
        await expect(page).toHaveURL(/inventory.html/);

        const swagLabsInventory = new SwagLabsInventory(page);
        await swagLabsInventory.footerCopy.scrollIntoViewIfNeeded();
        await expect(swagLabsInventory.footerCopy).toHaveText(/2024/);
        await expect(swagLabsInventory.footerCopy).toHaveText(
            /Terms of Service/,
        );
    });
});
