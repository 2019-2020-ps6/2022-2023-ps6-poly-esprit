import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('14, 15', () => {

  test('Redirection page admin depuis liste patient', async ({ page }) => {
      await page.goto(testUrl);
      await page.click('text=Admin Admin');
      await page.click('text=Afficher les patients');
      await page.click('text=Gestion des patients');
      await page.getByTestId('parameter').click();
      //await page.getByTitle('Gestion des patients').getByRole('button').first().click();
      const urlRegex = new RegExp('http://localhost:4200/admin');
      await expect(page.url()).toMatch(urlRegex);
  });

});
