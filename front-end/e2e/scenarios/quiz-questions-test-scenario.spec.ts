import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Test poubelle pour Simon Beurel', () => {

  test("Ajouter un quiz à la base de donnée", async({page}) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    await page.click('text=Ajouter un quiz');

    await page.getByPlaceholder("Nom du quiz").fill("TestPlaywrightQuiz");
    await page.getByPlaceholder("Thème du quiz").fill("ThemePlaywright");

    await page.click('text=Créer le nouveau quiz !');

    await expect(page.getByText('ThemePlaywright')).toBeVisible();

    await page.click('text=ThemePlaywright');

    await expect(page.getByText('TestPlaywrightQuiz')).toBeVisible();
  });

  test("Modifier un quiz déjà présent", async({page}) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');

    await page.click('text=Acteurs');

    await page.getByTestId('Les Acteurs-edit').click();

    await page.fill('input#title_quiz', '');

    await page.fill('input#title_quiz', 'Les acteurs du XXème siècle');

    await page.click('text=Modifier le titre du quiz');

    await page.click('text=Retour');

    await page.click('text=Acteurs');


    await expect(page.getByTestId('Les Acteurs-edit')).not.toBeVisible();
    await expect(page.getByTestId('Les acteurs du XXème siècle-edit')).toBeVisible();
  });

  

  test("Modifier une question dans un quiz", async({page}) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');

    await page.click('text=Acteurs');

    await page.getByTestId('Les Acteurs-edit').click();

    await page.getByTestId('Donner un film avec Will Smith-edit').click();

    await page.fill('input#title', '');
    await page.fill('input#title', 'Qui a joué dans XX');

    await page.fill('input#good_answer', '');
    await page.fill('input#good_answer', 'Pamela rose !');

    await page.click('text=Appliquer les modifications');

    await page.getByTestId('parameter').click();

    await page.click('text=Acteurs');
    await page.click('text=Les acteurs');
    await page.click('text=Duo (2 choix affichés)');
    await page.click('text=François Cluzet');
    await page.click('text=Valider');

    await expect(page.getByRole('button', { name: 'Pamela rose !' })).toBeVisible();
    await expect(page.getByText('Qui a joué dans XX')).toBeVisible();

  });

});
