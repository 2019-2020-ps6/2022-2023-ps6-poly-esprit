import { test, expect } from '@playwright/test';
import { testUrl } from '../e2e.config';
import { AdminMainPageFixture } from "../../src/app/admin-main-page/admin-main-page.fixture";
import { EditQuizFixture } from "../../src/app/edit-quiz-component/edit-quiz.fixture";
import { EditQuestionComponentFixture } from "../../src/app/edit-question-component/edit-question-component.fixture";

test.describe('Tests réalisés sur les questions et les quizs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(testUrl);
  });

  test("Ajouter un quiz à la base de donnée", async ({ page }) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    await page.click('text=Admin Admin');

    await AdminMainPageFI.clickAddQuiz();
    await AdminMainPageFI.AddQuiz('QuizTest', 'ThemeTest');

    await expect(AdminMainPageFI.isThemeVisible('ThemeTest')).toBeTruthy();

    await page.getByRole('heading', { name: 'Thème : ThemeTest' }).click();

    await expect(AdminMainPageFI.isQuizVisibile('QuizTest', 'ThemeTest')).toBeTruthy();

  });


  test("Modifier un quiz déjà présent", async ({ page }) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    const EditQuizFI = new EditQuizFixture(page);

    await page.click('text=Admin Admin');

    await AdminMainPageFI.goOnEditQuiz('Les technos WEB', 'Internet');

    await EditQuizFI.changeNameQuiz("Les technologies du Web");
    await EditQuizFI.goBackOnAdmin();

    await page.getByText('Internet').click();

    await expect(AdminMainPageFI.isQuizVisibile('Les technologies du Web', 'Internet')).toBeTruthy();
    await expect(AdminMainPageFI.isQuizNotVisible('Les technos web', 'Internet')).toBeTruthy();

  });


  test("Modifier une question dans un quiz", async ({ page }) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    const EditQuizFI = new EditQuizFixture(page);
    const EditQuestionFI = new EditQuestionComponentFixture(page);

    await page.click('text=Admin Admin');

    await AdminMainPageFI.goOnEditQuiz('Mais qui a tué Pamela Rose ?', 'Acteurs');
    await EditQuizFI.goOnEditQuestion('Question');

    let tab = ['Pamela rose !', "", "", ""];
    await EditQuestionFI.changeValuesQuestionAndGoBack("Quel personnage meurt dans la comédie policière de Kad&Olivier ?", tab);

    await page.getByTestId('logoutButton').click()
    await page.click('text=Simon Beurel');
    await page.click('text=Acteurs');
    await page.click('text=Mais qui a tué Pamela Rose ?');
    await page.getByRole('button', { name: 'Carré (4 choix affichés)' }).click();
    //click deconnexion -> click simon beurel -> click acteurs -> click pamela rose ->

    //await AdminMainPageFI.launchQuiz('Mais qui a tué Pamela Rose ?', 'Acteurs');

    //PLAY THE GAME
    /**await page.click('text=Duo (2 choix affichés)');
    await page.click('text=François Cluzet');
    await page.click('text=Valider');*/


    await expect(page.getByRole('button', { name: 'Pamela rose !' })).toBeVisible();
    await expect(page.getByText('Quel personnage meurt dans la comédie policière de Kad&Olivier ?')).toBeVisible();

  });


  test("Ajouter une question dans un quiz", async ({ page }) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    const EditQuizFI = new EditQuizFixture(page);

    await page.click('text=Admin Admin');

    await AdminMainPageFI.goOnEditQuiz('La révolution française', 'Histoire');


    let tab = ["Simon Beurel", "Arnaud Dumanois", "Quentin Maurois", "Lorenzo Froment"];
    await EditQuizFI.addQuestionAndGoBack('Qui est né le 10 Mai 2001 ?', tab);

    await AdminMainPageFI.launchQuiz('La révolution française', 'Histoire');

    //PLAY THE GAME
    await page.click('text=Duo (2 choix affichés)');
    await page.click('text=1789');
    await page.click('text=Valider');
    await page.click('text=Fin de la Seconde Guerre Mondiale');
    await page.click('text=Valider');
    await page.click('text=14 Juillet 1789');
    await page.click('text=Valider');

    await expect(page.getByRole('button', { name: 'Simon Beurel' })).toBeVisible();
    await expect(page.getByText('Qui est né le 10 Mai 2001 ?')).toBeVisible();

  });


  test("Supprimer un quiz déjà présent", async ({ page }) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    await page.click('text=Admin Admin');
    await AdminMainPageFI.deleteQuiz('La seconde guerre mondiale', 'Guerres');
    await page.getByText('Guerres').click();
    await expect(AdminMainPageFI.isQuizNotVisible('La seconde guerre mondiale', 'Guerres')).toBeTruthy();
  });

  test('Supprimer une question (quiz acteur)', async ({ page }) => {
    const AdminMainPageFI = new AdminMainPageFixture(page);
    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    await AdminMainPageFI.goOnEditQuiz('Docker', 'Internet');
      await page.getByRole('listitem').filter({ hasText: 'Question : Comment importer une image dans un Dockerfile ?' }).getByRole('button', { name: 'Supprimer la question' }).click();
    await expect(page.getByText('Question : Comment importer une image dans un Dockerfile ?')).not.toBeVisible();
  });

});
