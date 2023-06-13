import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
//import { StatsFeature } from 'src/app/stats-visualisation/stats-visualisation.fixture';

test.describe('Test initial\nCréer et modifier un patient', () => {
  test('test empty stats for new user', async ({ page }) => {
    await page.goto("http://localhost:4200/stats/-1");
    expect(page.getByText('Le patient doit jouer')).toBeVisible();
  });
});
