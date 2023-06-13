import {test, expect } from '@playwright/test';
import {testUrl } from 'e2e/e2e.config';
import {adminManagementUsersFixture } from 'src/app/admin-management-users/admin-management-users.fixture';
import {statsFixture } from 'src/app/stats-visualisation/stats-visualisation.fixture';

test.describe('Tests concernants les statistiques', () => {
  test('test pour un nouvel utilisateur', async ({page}) => {
    await page.goto(testUrl);
    const fixture = new adminManagementUsersFixture(page);
    const fixtureStats = new statsFixture(page);

    await fixture.addUser("Terteur", "booh", "36", "Femme", "0", false, false, false, "");
    await fixtureStats.goToStats("Terteur");
    await expect(page.getByText('Les statistiques de cet utilisateur ne sont pas encore disponibles')).toBeVisible();
    await fixture.delUser("Terteur");
  });

test('test stats for user', async ({page}) => {
  await page.goto(testUrl);
  const fixture = new adminManagementUsersFixture(page);
  const fixtureStats = new statsFixture(page);

  await fixture.addUser("Terter", "booh", "68", "Homme", "1", false, false, false, "");



  await fixture.delUser("Terteur");
});
});
