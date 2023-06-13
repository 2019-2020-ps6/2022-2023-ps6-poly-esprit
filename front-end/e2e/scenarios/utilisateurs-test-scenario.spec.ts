import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import {adminManagementUsersFixture} from "../../src/app/admin-management-users/admin-management-users.fixture";

// Scénario de test du nom du titre de la page

test.describe('Tests utilisateurs', () => {
  test('Test Creation Suppression Utilisateurs', async ({ page}) => {
    await page.goto(testUrl);

    const fixture = new adminManagementUsersFixture(page);
    await fixture.addUser("Bowser", "Mario", "25", "Homme", "2", false, false, false, "");

    await page.click('text=retour');

    let nomUtilisateur = await page.getByRole('heading', {name:"Bowser"});
    expect(nomUtilisateur).toBeVisible();

    await fixture.modifyUser("Bowser", "Peach", "Mario", "25", "Homme", "0", false, false, false, "");

    await page.click('text=Retour');
    expect(nomUtilisateur).not.toBeVisible();
    nomUtilisateur = await page.getByRole('heading', {name:"Peach"});

    await fixture.delUser("Peach");

    expect(nomUtilisateur).not.toBeVisible();
  })
})
