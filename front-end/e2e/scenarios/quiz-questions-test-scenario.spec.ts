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


  test("Ajouter une question dans un quiz", async({page}) => {

    await page.goto(testUrl);
    await page.click('text=Admin Admin');

    await page.click('text=Acteurs');

    await page.getByTestId('Les Acteurs-edit').click();

    await page.fill('input#title', '');
    await page.fill('input#title', 'Qui est né le 10 Mai 2001 ?');

    await page.fill('input#good_answer', '');
    await page.fill('input#good_answer', 'Simon Beurel');

    await page.fill('input#bad_answer1', '');
    await page.fill('input#bad_answer1', 'Arnaud Dumanois');

    await page.fill('input#bad_answer2', '');
    await page.fill('input#bad_answer2', 'Quentin Maurois');

    await page.fill('input#bad_answer3', '');
    await page.fill('input#bad_answer3', 'Lorenzo Froment');

    await page.getByRole('button', { name: 'Ajouter une nouvelle question' }).click();

    await page.getByTestId('parameter').click();
    await page.click('text=Acteurs');
    await page.click('text=Les acteurs');
    await page.click('text=Duo (2 choix affichés)');
    await page.click('text=François Cluzet');
    await page.click('text=Valider');
    await page.click('text=Men in Black');
    await page.click('text=Valider');

    await expect(page.getByRole('button', { name: 'Simon Beurel' })).toBeVisible();
    await expect(page.getByText('Qui est né le 10 Mai 2001 ?')).toBeVisible();

  });

  test("Supprimer un quiz déjà présent", async({page}) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');

    await page.click('text=Acteurs');

    await page.getByTestId('Les Acteurs-delete').click();

    await page.getByRole('button', { name: 'Oui' }).click();

    await expect(page.getByTestId('Les Acteurs-edit')).not.toBeVisible();
  });


});
