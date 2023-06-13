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

    await fixture.gotoAjouterUtilisateur("Admin");
    await fixture.addUser("Terteur", "booh", "36", "Femme", "0", false, false, false, "");
    await fixtureStats.goToStats("Terteur");
    await expect(page.getByText('Les statistiques de cet utilisateur ne sont pas encore disponibles.')).toBeVisible();
    await page.getByTestId("logoutButton").click();
    await fixture.gotoListePatients("Admin");
    await fixture.delUser("Terteur");
  });

test('Test pour un utilisateur avec bonnes réponses et bon click', async ({page}) => {
  await page.goto(testUrl);
  const fixture = new adminManagementUsersFixture(page);
  const fixtureStats = new statsFixture(page);

  const fixtureQuiz = new GamePageComponentFixture(page);
  const name = "Martin"

  await fixture.gotoAjouterUtilisateur("Admin");
  await fixture.addUser(name, "Martin", "68", "Homme", "1", false, false, false, "");
  await page.getByTestId("logoutButton").click();
  await fixtureQuiz.PlayQuiz(name, "Acteurs", "Les Acteurs", ["François Cluzet", "Men in Black"], 2, true);
  await fixtureStats.goToStats(name);
  await page.getByTestId("logoutButton").click();
  await fixture.gotoListePatients("Admin");
  await fixture.delUser(name);
});

test('Test pour un utilisateur avec mauvaises réponses et mauvais click', async ({page}) => {
  await page.goto(testUrl);
  const fixture = new adminManagementUsersFixture(page);
  const fixtureStats = new statsFixture(page);
  const fixtureQuiz = new GamePageComponentFixture(page);
  const name = "Client"

  await fixture.gotoAjouterUtilisateur("Admin");
  await fixture.addUser(name, "baah", "36", "Femme", "0", false, false, false, "");
  await page.getByTestId("logoutButton").click();
  await fixtureQuiz.PlayQuiz(name, "Acteurs", "Les Acteurs", ["Jean Dujardin", "Winnie l'ourson"], 0, true);
  await fixtureStats.goToStats(name);
  await page.getByTestId("logoutButton").click();
  await fixture.gotoListePatients("Admin");
  await fixture.delUser(name);
});

});
