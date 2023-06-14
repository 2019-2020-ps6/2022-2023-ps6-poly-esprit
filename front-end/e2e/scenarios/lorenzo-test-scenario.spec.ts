import { test, expect } from '@playwright/test';
import { testUrl } from '../e2e.config';

test.describe('Nom de votre suite de tests', () => {

  test('Jouer un quizz et avoir 2 points sur 2', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Simon Beurel');
    await page.click('text=Acteurs');
    await page.click('text=Les Acteurs');
    await page.click('text=Duo (2 choix affichés) ');
    await page.click('text=François Cluzet');
    await page.click('text=Valider');
    await page.click('text=Men in Black');
    await page.click('text=Valider');
    await expect(page.getByText('Bravo ! Vous avez terminé le quiz avec 2 points.')).toBeVisible();


  });
  test('Jouer un quizz et avoir 1 points sur 2', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Simon Beurel');
    await page.click('text=Acteurs');
    await page.click('text=Les Acteurs');
    await page.click('text=Carré (4 choix affichés)');
    await page.getByRole('button', { name: 'Jean Dujardin' }).click();
    await page.click('text=Valider');
    await page.getByRole('button', { name: 'Men in Black' }).click();
    await page.click('text=Valider');
    await expect(page.getByText('Bravo ! Vous avez terminé le quiz avec 1 point.')).toBeVisible();


  });
  test('Jouer un quizz et avoir 0 points sur 2', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Simon Beurel');
    await page.click('text=Acteurs');
    await page.click('text=Les Acteurs');
    await page.click('text=Carré (4 choix affichés)');
    await page.getByRole('button', { name: 'Jean Dujardin' }).click();
    await page.click('text=Valider');
    await page.getByRole('button', { name: 'Le Parrain' }).click();
    await page.click('text=Valider');
    await expect(page.getByText('Dommage ! Vous allez vous améliorer !')).toBeVisible();


  });

  test('Test input filtrage, autres thèmes disparaissent', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Simon Beurel');
    const inputRecherche = await page.$('#inputRecherche');
    await inputRecherche?.type('Acteurs');
    await expect(page.getByText('Internet')).not.toBeVisible();

  });

  test('Test input filtrage et defiltrage en vidant le input', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Simon Beurel');
    const inputRecherche = await page.$('#inputRecherche');
    await inputRecherche?.type('Acteurs');
    await inputRecherche?.fill('');
    await expect(page.getByText('Internet')).toBeVisible();

  });





});
