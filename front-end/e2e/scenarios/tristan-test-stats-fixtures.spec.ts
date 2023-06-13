import {test, expect } from '@playwright/test';
import {testUrl } from 'e2e/e2e.config';
import {adminManagementUsersFixture } from 'src/app/admin-management-users/admin-management-users.fixture';
import {statsFixture } from 'src/app/stats-visualisation/stats-visualisation.fixture';
import {GamePageComponentFixture } from 'src/app/game-page-component/game-page-component.fixture'

test.describe('Tests concernants les statistiques', () => {
  test('test pour un nouvel utilisateur', async ({page}) => {
    await page.goto(testUrl);
    const fixture = new adminManagementUsersFixture(page);
    const fixtureStats = new statsFixture(page);

    await fixture.autoAddUser("Terteur", "booh", "36", "Femme", "0", false, false, false, "");
    await fixtureStats.goToStats("Terteur");
    await expect(page.getByText('Les statistiques de cet utilisateur ne sont pas encore disponibles.')).toBeVisible();
    await fixture.autoDeleteUser("Terteur");
  });

test('Test pour un utilisateur avec bonnes réponses et bon click', async ({page}) => {
  await page.goto(testUrl);
  const fixture = new adminManagementUsersFixture(page);
  const fixtureStats = new statsFixture(page);

  const fixtureQuiz = new GamePageComponentFixture(page);
  const name = "Martin"

  await fixture.autoAddUser(name, "Martin", "68", "Homme", "1", false, false, false, "");
  await fixtureQuiz.PlayQuiz(name, "Acteurs", "Les Acteurs", ["François Cluzet", "Men in Black"], 2, true);
  await fixtureStats.goToStats(name);
  await fixture.autoDeleteUser(name);
});

test('Test pour un utilisateur avec mauvaises réponses et mauvais click', async ({page}) => {
  await page.goto(testUrl);
  const fixture = new adminManagementUsersFixture(page);
  const fixtureStats = new statsFixture(page);
  const fixtureQuiz = new GamePageComponentFixture(page);
  const name = "Client"

  await fixture.autoAddUser(name, "baah", "36", "Femme", "0", false, false, false, "");
  await fixtureQuiz.PlayQuiz(name, "Acteurs", "Les Acteurs", ["Jean Dujardin", "Winnie l'ourson"], 0, true);
  await fixtureStats.goToStats(name);
  await fixture.autoDeleteUser(name);
});

});
