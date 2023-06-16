import { test, expect } from '@playwright/test';
import { testUrl } from '../e2e.config';
import { adminManagementUsersFixture } from "../../src/app/admin-management-users/admin-management-users.fixture";

// Scénario de test du nom du titre de la page

test.describe('Tests utilisateurs', () => {
  test('Test Creation Suppression Utilisateurs', async ({ page }) => {
    await page.goto(testUrl);

    const managementUsersFixture = new adminManagementUsersFixture(page);

    await managementUsersFixture.gotoAjouterUtilisateur("Admin");
    await managementUsersFixture.addUser("Bowser", "Mario", "25", "Homme", "2", false, false, false, "");

    await page.click('text=retour');

    let nomUtilisateur = await page.getByRole('heading', { name: "Bowser" });
    expect(nomUtilisateur).toBeVisible();
  });


  test('Test Modification Utilisateurs', async ({ page }) => {
    await page.goto(testUrl);

    const managementUsersFixture = new adminManagementUsersFixture(page);

    await managementUsersFixture.gotoListePatients("Admin");

    let nomUtilisateur = await page.getByRole('heading', { name: "Bowser" });
    expect(nomUtilisateur).toBeVisible();

    await managementUsersFixture.modifyUser("Bowser", "Peach", "Mario", "25", "Homme", "0", false, false, false, "");

    expect(nomUtilisateur).not.toBeVisible();

    nomUtilisateur = await page.getByRole('heading', { name: "Peach" });
    expect(nomUtilisateur).toBeVisible();

    await page.locator('.logout').click();

    nomUtilisateur = await page.getByRole('heading', { name: "Peach" });
    expect(nomUtilisateur).toBeVisible();
  });

  test('Test Suppression Utilisateurs', async ({ page }) => {
    await page.goto(testUrl);

    const managementUsersFixture = new adminManagementUsersFixture(page);

    await managementUsersFixture.gotoListePatients("Admin");

    let nomUtilisateur = await page.getByRole('heading', { name: "Peach" });

    await managementUsersFixture.delUser("Peach");

    expect(nomUtilisateur).not.toBeVisible();

  })
})
