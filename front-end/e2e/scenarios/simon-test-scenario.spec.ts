import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Test poubelle pour Simon Beurel', () => {

  test('Basic test pour vérifier si on choppe le texte', async ({ page }) => {
    await page.goto(testUrl);
    await expect(page.getByText('Admin Admin')).toBeVisible();
  });

  test('Test pour vérifier une redirection sur la page admin', async ({ page }) => {
    await page.goto(testUrl);
    //Click on the text Admin Admin and check the url
    await page.click('text=Admin Admin');
    await expect(page.url()).toBe('http://localhost:4200/admin/1684739070790');
  });



});
