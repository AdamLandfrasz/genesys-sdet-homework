import { test, expect } from '@playwright/test';
import { SwagLabsHome } from '../test/pages/swag-labs';

test.describe('Automated Purchase Process', () => {
    test('log in with credentials and go through check out process', async ({
        page,
    }) => {
        const swagLabsPage = new SwagLabsHome(page);
        await swagLabsPage.goto();
        await expect(page).toHaveTitle(/Swag Labs/);
        await swagLabsPage.logInWithCredentials();
        await expect(page).toHaveURL(/inventory.html/);
    });
});
