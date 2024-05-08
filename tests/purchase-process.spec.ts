import { test, expect } from '@playwright/test';
import { SwagLabs } from '../test/pages/swag-labs';

test.describe('Automated Purchase Process', () => {
    test('log in with credentials and go through check out process', async ({ page }) => {
        const swagLabsPage = new SwagLabs(page);
        await swagLabsPage.goto();
        await expect(page).toHaveTitle(/Swag Labs/);
      });

})
  