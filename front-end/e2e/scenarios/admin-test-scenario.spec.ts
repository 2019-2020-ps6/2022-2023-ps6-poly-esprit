import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('14, 15', () => {

  test('Supprimer une question (quiz acteur)', async ({ page }) => {
await page.goto(testUrl);
    await page.click('text=Admin Admin');
    await page.click('text= Thème : Acteurs ');
    await page.click('text=Modifier le quiz');
    await page.getByRole('listitem').filter({ hasText: 'Question : Qui est l\'acteur principal du film Intouchables ? Supprimer la questi' }).getByRole('button', { name: 'Supprimer la question' }).click();
    await expect(page.getByText('Question : Qui est l\'acteur principal du film Intouchables ?')).not.toBeVisible();
  });
  test('Redirection page admin depuis liste patient', async ({ page }) => {
      await page.goto(testUrl);
      await page.click('text=Admin Admin');
      await page.click('text=Afficher les patients');
      await page.getByTitle('Gestion des patients').getByRole('button').first().click();
      const urlRegex = new RegExp('http://localhost:4200/admin');
      await expect(page.url()).toMatch(urlRegex);
  });

});
