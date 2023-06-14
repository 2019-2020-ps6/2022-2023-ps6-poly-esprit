import { test, expect } from '@playwright/test';
import { testUrl } from '../e2e.config';
import { GamePageComponentFixture } from "../../src/app/game-page-component/game-page-component.fixture";

test.describe('Jouer un quiz (stade 4)', () => {
  test('Jouer un quizz et avoir 2 points sur 2', async ({ page }) => {
    const fixtureAnswer = new GamePageComponentFixture(page);
    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsLorenzo();
    await fixtureAnswer.answerQuestion('François Cluzet');
    await fixtureAnswer.answerQuestion('Men in Black');
    await expect(page.getByText('Bravo ! Vous avez terminé le quiz avec 2 points.')).toBeVisible();
  });
  test('Jouer un quizz et  1 points sur 2', async ({ page }) => {
    const fixtureAnswer = new GamePageComponentFixture(page);
    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsLorenzo();
    await fixtureAnswer.answerBadQuestion();
    await fixtureAnswer.answerQuestion('Men in Black');
    await expect(page.getByText('Bravo ! Vous avez terminé le quiz avec 1 point.')).toBeVisible();
  });
  test('Jouer un quizz et avoir 0 points sur 2', async ({ page }) => {
    const fixtureAnswer = new GamePageComponentFixture(page);

    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsLorenzo();
    await fixtureAnswer.answerBadQuestion();
    await fixtureAnswer.answerBadQuestion();
    await expect(page.getByText('Dommage ! Vous allez vous améliorer !')).toBeVisible();
  });
});

test.describe('Jouer un quiz (stade 0)', () => {
  test('Jouer un quizz et avoir 2 points sur 2', async ({ page }) => {
    const fixtureAnswer = new GamePageComponentFixture(page);
    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsSimon();
    await page.getByRole('button', { name: 'François Cluzet' }).click();
    await page.getByRole('button', { name: 'Valider' }).click();
    await page.getByRole('button', { name: 'Men in Black' }).click();
    await page.getByRole('button', { name: 'Valider' }).click();
    await expect(page.getByText('Bravo ! Vous avez terminé le quiz avec 2 points.')).toBeVisible();
  });
  test('Jouer un quizz et  1 points sur 2', async ({ page }) => {
    const fixtureAnswer = new GamePageComponentFixture(page);
    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsSimon();
    await page.getByRole('button', { name: 'Will Smith' }).click();
    await page.getByRole('button', { name: 'Valider' }).click();
    await page.getByRole('button', { name: 'Men in Black' }).click();
    await page.getByRole('button', { name: 'Valider' }).click();
    await expect(page.getByText('Bravo ! Vous avez terminé le quiz avec 1 point.')).toBeVisible();
  });
  test('Jouer un quizz et avoir 0 points sur 2', async ({ page }) => {
    const fixtureAnswer = new GamePageComponentFixture(page);
    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsSimon();
    await page.getByRole('button', { name: 'Will Smith' }).click();
    await page.getByRole('button', { name: 'Valider' }).click();
    await page.getByRole('button', { name: 'Iron Man' }).click();
    await page.getByRole('button', { name: 'Valider' }).click();
    await expect(page.getByText('Dommage ! Vous allez vous améliorer !')).toBeVisible();
  });
});

test.describe('Vérifier le changement de taille', () => {
  test('Vérifier que les boutons deviennent plus gros', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Simon Beurel');
    await page.getByText('Acteurs').click();
    await page.click('text=Les Acteurs');
    const bouton = await page.getByRole('button', { name: 'Carré (4 choix affichés)' });
    const tailleBeforeEdit = await bouton.boundingBox();
    const texteBeforeEdit = await bouton.evaluateHandle((e: any) => e.textContent);
    await page.getByTestId('parameter').click();
    await page.getByTestId('big_buttons').click();
    await page.getByTestId('big_text').click();
    await page.click('text=Retour');
    const bouton2 = page.getByRole('button', { name: 'Carré (4 choix affichés)' });
    const tailleAfterEdit = await bouton2.boundingBox();
    const texteAfterEdit = await bouton2.evaluateHandle((e: any) => e.textContent);
    // @ts-ignore
    await expect(tailleBeforeEdit.height < tailleAfterEdit.height).toBeTruthy();
    await expect(texteBeforeEdit != texteAfterEdit).toBeTruthy();
  });

  test('Vérifier l\' aggrandissement du bouton lorsque la souris est dessus', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Simon Beurel');
    await page.getByText('Acteurs').click();
    await page.click('text=Les Acteurs');
    const bouton = await page.getByRole('button', { name: 'Carré (4 choix affichés)' });
    const tailleBeforeEdit = await bouton.boundingBox();
    await bouton.hover(); // Passage de la souris sur le bouton
    const tailleAfterHover = await bouton.boundingBox();
    // @ts-ignore
    await expect(tailleBeforeEdit.height < tailleAfterHover.height).toBeTruthy();
    // @ts-ignore
    await expect(tailleBeforeEdit.width < tailleAfterHover.width).toBeTruthy();
  });

});
