import { test, expect } from '@playwright/test';
import { testUrl } from '../e2e.config';
import { adminManagementUsersFixture } from '../../src/app/admin-management-users/admin-management-users.fixture';
import { statsFixture } from '../../src/app/stats-visualisation/stats-visualisation.fixture';
import { GamePageComponentFixture } from '../../src/app/game-page-component/game-page-component.fixture'

test.describe('Tests concernants les statistiques', () => {
  const timeOut = 2000


  test('Vérification fonctionnement comparaison d\'image', async ({ page }) => {
    await page.goto(testUrl);
    const fixtureStats = new statsFixture(page);

    await fixtureStats.goToStats("onlyForStats");
    await expect(page.locator('apx-chart')).toBeVisible();
    await page.waitForTimeout(timeOut);
    // await expect(page.locator('apx-chart')).toHaveScreenshot("stats100.png");

    await page.getByRole('button', { name: 'réponses' }).click();
    await page.waitForTimeout(timeOut);
    // await expect(page.locator('apx-chart')).toHaveScreenshot("stats50.png");
  });



  test('test pour un nouvel utilisateur', async ({ page }) => {
    await page.goto(testUrl);
    const fixture = new adminManagementUsersFixture(page);
    const fixtureStats = new statsFixture(page);

    await fixture.autoAddUser("Terteur", "booh", "36", "Femme", "0", false, false, false, "");
    await fixtureStats.goToStats("Terteur");
    await expect(page.locator('apx-chart')).not.toBeVisible();
    await expect(page.getByText('Les statistiques de cet utilisateur ne sont pas encore disponibles.')).toBeVisible();
    let head = await page.locator('.title');
    await expect(await head.getByText('précision')).toBeVisible();
    await expect(await head.getByText('bonnes')).not.toBeVisible();
    await page.getByRole("button", { name: "réponses" }).click();
    head = await page.locator('.title');
    await expect(await head.getByText('précision')).not.toBeVisible();
    await expect(await head.getByText('bonnes')).toBeVisible();
    await fixture.autoDeleteUser("Terteur");
  });

  test('Test pour un utilisateur avec bonnes réponses et bon clicks', async ({ page }) => {
    await page.goto(testUrl);
    const fixture = new adminManagementUsersFixture(page);
    const fixtureStats = new statsFixture(page);

    const fixtureQuiz = new GamePageComponentFixture(page);
    const name = "Martin"

    await fixture.autoAddUser(name, "Martin", "68", "Homme", "1", false, false, false, "");
    await fixtureQuiz.PlayQuiz(name, "Acteurs", "Les Acteurs", ["François Cluzet", "Men in Black"], 2, true);
    await fixtureStats.goToStats(name);
    await expect(page.locator('apx-chart')).toBeVisible();
    await page.waitForTimeout(timeOut);
    // await expect(await page.locator('apx-chart')).toHaveScreenshot("stats100.png");
    // await expect(await page.locator('apx-chart')).not.toHaveScreenshot("stats50.png");
    await page.getByRole('button', { name: 'réponses' }).click();
    await expect(page.locator('apx-chart')).toBeVisible();
    await page.waitForTimeout(timeOut);
    // await expect(await page.locator('apx-chart')).toHaveScreenshot("stats100.png");
    // await expect(await page.locator('apx-chart')).not.toHaveScreenshot("stats50.png");
    await fixture.autoDeleteUser(name);
  });

  test('Test pour un utilisateur avec mauvaises réponses et bons clicks', async ({ page }) => {
    await page.goto(testUrl);
    const fixture = new adminManagementUsersFixture(page);
    const fixtureStats = new statsFixture(page);
    const fixtureQuiz = new GamePageComponentFixture(page);
    const name = "Client"

    await fixture.autoAddUser(name, "baah", "36", "Femme", "0", false, false, false, "");
    await fixtureQuiz.PlayQuiz(name, "Acteurs", "Les Acteurs", ["Jean Dujardin", "Winnie l'ourson"], 0, true);
    await fixtureStats.goToStats(name);
    await expect(page.locator('apx-chart')).toBeVisible();
    await page.waitForTimeout(timeOut);
    // await expect(await page.locator('apx-chart')).toHaveScreenshot("stats100.png");
    // await expect(await page.locator('apx-chart')).not.toHaveScreenshot("stats50.png");
    await page.getByRole('button', { name: 'réponses' }).click();
    await expect(page.locator('apx-chart')).toBeVisible();
    await page.waitForTimeout(timeOut);
    // await expect(await page.locator('apx-chart')).not.toHaveScreenshot("stats100.png");
    // await expect(await page.locator('apx-chart')).not.toHaveScreenshot("stats50.png");
    await fixture.autoDeleteUser(name);
  });

  test('Test pour un utilisateur avec bonnes réponses et mauvais clicks', async ({ page }) => {
    await page.goto(testUrl);
    const fixture = new adminManagementUsersFixture(page);
    const fixtureStats = new statsFixture(page);
    const fixtureQuiz = new GamePageComponentFixture(page);
    const name = "Minigetti"

    await fixture.autoAddUser(name, "baah", "96", "Femme", "4", false, false, false, "");
    await fixtureQuiz.PlayQuizHalfMissclick(name, "Acteurs", "Les Acteurs", ["François Cluzet", "Men in Black"], 2, null);
    await fixtureStats.goToStats(name);
    await expect(page.locator('apx-chart')).toBeVisible();
    await page.waitForTimeout(timeOut);
    // await expect(await page.locator('apx-chart')).not.toHaveScreenshot("stats100.png");
    // await expect(await page.locator('apx-chart')).toHaveScreenshot("stats50.png");
    await page.getByRole('button', { name: 'réponses' }).click();
    await expect(page.locator('apx-chart')).toBeVisible();
    await page.waitForTimeout(timeOut);
    // await expect(await page.locator('apx-chart')).toHaveScreenshot("stats100.png");
    // await expect(await page.locator('apx-chart')).not.toHaveScreenshot("stats50.png");
    await fixture.autoDeleteUser(name);
  });

  test('Test pour un utilisateur avec mauvaises réponses et mauvais clicks', async ({ page }) => {
    await page.goto(testUrl);
    const fixture = new adminManagementUsersFixture(page);
    const fixtureStats = new statsFixture(page);
    const fixtureQuiz = new GamePageComponentFixture(page);
    const name = "ZZSeven"

    await fixture.autoAddUser(name, "baah", "77", "Femme", "0", false, false, false, "");
    await fixtureQuiz.PlayQuizHalfMissclick(name, "Acteurs", "Les Acteurs", ["Jean Dujardin", "Winnie l'ourson"], 0, true);
    await fixtureStats.goToStats(name);
    await expect(page.locator('apx-chart')).toBeVisible();
    await page.waitForTimeout(timeOut);
    // await expect(await page.locator('apx-chart')).not.toHaveScreenshot("stats100.png");
    // await expect(await page.locator('apx-chart')).toHaveScreenshot("stats50.png");
    await page.getByRole('button', { name: 'réponses' }).click();
    await expect(page.locator('apx-chart')).toBeVisible();
    await page.waitForTimeout(timeOut);
    // await expect(await page.locator('apx-chart')).not.toHaveScreenshot("stats100.png");
    // await expect(await page.locator('apx-chart')).not.toHaveScreenshot("stats50.png");
    await fixture.autoDeleteUser(name);
  });
});
