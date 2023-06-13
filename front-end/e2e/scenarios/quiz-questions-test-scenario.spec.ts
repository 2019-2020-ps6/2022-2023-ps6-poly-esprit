import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AdminMainPageFixture} from "../../src/app/admin-main-page/admin-main-page.fixture";
import {EditQuizFixture} from "../../src/app/edit-quiz-component/edit-quiz.fixture";
import {EditQuestionComponentFixture} from "../../src/app/edit-question-component/edit-question-component.fixture";

test.describe('Tests réalisés sur les questions et les quizs', () => {

  test.beforeEach(async ({page}) => {
      await page.goto(testUrl);
  });

  test("Ajouter un quiz à la base de donnée", async({page}) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    await page.click('text=Admin Admin');

    await AdminMainPageFI.clickAddQuiz();
    await AdminMainPageFI.AddQuiz('QuizTest', 'ThemeTest');

    await expect(AdminMainPageFI.isThemeVisible('ThemeTest')).toBeTruthy();

    await page.getByText('ThemeTest').click();

    await expect(AdminMainPageFI.isQuizVisibile('QuizTest', 'ThemeTest')).toBeTruthy();
  });


  test("Modifier un quiz déjà présent", async({page}) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    const EditQuizFI = new EditQuizFixture(page);

    await page.click('text=Admin Admin');

    await AdminMainPageFI.goOnEditQuiz('Les Acteurs', 'Acteurs');

    await EditQuizFI.changeNameQuiz("Les acteurs du XXème siècle");
    await EditQuizFI.goBackOnAdmin();

    await page.getByText('Acteurs').click();

    await expect(AdminMainPageFI.isQuizVisibile('Les acteurs du XXème siècle', 'Acteurs')).toBeTruthy();
    await expect(AdminMainPageFI.isQuizNotVisible('Les Acteurs', 'Acteurs')).toBeTruthy();

  });


  test("Modifier une question dans un quiz", async({page}) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    const EditQuizFI = new EditQuizFixture(page);
    const EditQuestionFI = new EditQuestionComponentFixture(page);

    await page.click('text=Admin Admin');

    await AdminMainPageFI.goOnEditQuiz('Les Acteurs', 'Acteurs');
    await EditQuizFI.goOnEditQuestion('Donner un film avec Will Smith');


    let tab = ['Pamela rose !', "", "", ""];
    await EditQuestionFI.changeValuesQuestionAndGoBack("Quel personnage meurt dans la comédie policière de Kad&Olivier ?",tab);

    await AdminMainPageFI.launchQuiz('Les acteurs', 'Acteurs');

    //PLAY THE GAME
    await page.click('text=Duo (2 choix affichés)');
    await page.click('text=François Cluzet');
    await page.click('text=Valider');

    await expect(page.getByRole('button', { name: 'Pamela rose !' })).toBeVisible();
    await expect(page.getByText('Quel personnage meurt dans la comédie policière de Kad&Olivier ?')).toBeVisible();

  });


  test("Ajouter une question dans un quiz", async({page}) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    const EditQuizFI = new EditQuizFixture(page);

    await page.click('text=Admin Admin');

    await AdminMainPageFI.goOnEditQuiz('Les Acteurs','Acteurs');


    let tab = ["Simon Beurel", "Arnaud Dumanois", "Quentin Maurois", "Lorenzo Froment"];
    await EditQuizFI.addQuestionAndGoBack('Qui est né le 10 Mai 2001 ?',tab);

    await AdminMainPageFI.launchQuiz('Les acteurs', 'Acteurs');

    //PLAY THE GAME
    await page.click('text=Duo (2 choix affichés)');
    await page.click('text=François Cluzet');
    await page.click('text=Valider');
    await page.click('text=Men in Black');
    await page.click('text=Valider');

    await expect(page.getByRole('button', { name: 'Simon Beurel' })).toBeVisible();
    await expect(page.getByText('Qui est né le 10 Mai 2001 ?')).toBeVisible();

  });


  test("Supprimer un quiz déjà présent", async({page}) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    await page.click('text=Admin Admin');
    await AdminMainPageFI.deleteQuiz('Les Acteurs','Acteurs');
    await page.getByText('Acteurs').click();
    await expect(AdminMainPageFI.isQuizNotVisible('Les Acteurs','Acteurs')).toBeTruthy();
  });


});
