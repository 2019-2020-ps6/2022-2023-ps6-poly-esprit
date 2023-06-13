import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import {GamePageComponentFixture} from "../../src/app/game-page-component/game-page-component.fixture";

test.describe('Jouer un quiz (stade 4)', () => {
  test('Jouer un quizz et avoir 2 points sur 2', async ({page}) => {
    const fixtureAnswer = new GamePageComponentFixture(page);
    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsLorenzo();
    await fixtureAnswer.answerQuestion('François Cluzet');
    await fixtureAnswer.answerQuestion('Men in Black');
    await expect(page.getByText('Bravo ! Vous avez terminé le quiz avec 2 points.')).toBeVisible();
  });
  test('Jouer un quizz et  1 points sur 2', async ({page}) => {
    const fixtureAnswer = new GamePageComponentFixture(page);
    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsLorenzo();
    await fixtureAnswer.answerBadQuestion();
    await fixtureAnswer.answerQuestion('Men in Black');
    await expect(page.getByText('Bravo ! Vous avez terminé le quiz avec 1 point.')).toBeVisible();
  });
  test('Jouer un quizz et avoir 0 points sur 2', async ({page}) => {
    const fixtureAnswer = new GamePageComponentFixture(page);

    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsLorenzo();
    await fixtureAnswer.answerBadQuestion();
    await fixtureAnswer.answerBadQuestion();
    await expect(page.getByText('Dommage ! Vous allez vous améliorer !')).toBeVisible();
  });
});

test.describe('Jouer un quiz (stade 0)', () => {
  test('Jouer un quizz et avoir 2 points sur 2', async ({page}) => {
    const fixtureAnswer = new GamePageComponentFixture(page);
    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsSimon();
    await page.getByRole('button', { name: 'François Cluzet' }).click();
    await page.click('text=Valider');
    await page.getByRole('button', { name: 'Men in Black' }).click();
    await page.click('text=Valider');
    await expect(page.getByText('Bravo ! Vous avez terminé le quiz avec 2 points.')).toBeVisible();
  });
  test('Jouer un quizz et  1 points sur 2', async ({page}) => {
    const fixtureAnswer = new GamePageComponentFixture(page);
    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsSimon();
    await page.click('text=Will Smith');
    await page.click('text=Valider');
    await page.getByRole('button', { name: 'Men in Black' }).click();
    await page.click('text=Valider');
    await expect(page.getByText('Bravo ! Vous avez terminé le quiz avec 1 point.')).toBeVisible();
  });
  test('Jouer un quizz et avoir 0 points sur 2', async ({page}) => {
    const fixtureAnswer = new GamePageComponentFixture(page);
    await page.goto(testUrl);
    await fixtureAnswer.StartQuizAsSimon();
    await page.click('text=Will Smith');
    await page.click('text=Valider');
    await page.click('text=Iron Man');
    await page.click('text=Valider');
    await expect(page.getByText('Dommage ! Vous allez vous améliorer !')).toBeVisible();
  });
});
