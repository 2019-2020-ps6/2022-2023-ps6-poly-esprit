import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Test initial\nCréer et modifier un patient', () => {

  test('test présence de admin et absence de user', async ({ page }) => {
    await page.goto(testUrl);
    expect(page.getByText('Admin Admin')).toBeVisible();
    expect(page.getByText('Perso Testeur')).not.toBeVisible();
  });

  /*test('Créer l\'utilisateur', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    expect(page.url()).toBe('http://localhost:4200/admin/1684739070790');
    await page.click("text=Afficher les patients")
    expect(page.url()).toBe('http://localhost:4200/management-users/1684739070790');
    await page.click("text=Ajouter un patient");
    expect(page.url()).toBe('http://localhost:4200/user-create/1684739070790');
    //await page.fill('[name="Nom"]', 'Testeur');
    await page.getByRole('textbox', { name: 'Nom', exact: true }).fill('Tester');
    await page.getByRole('textbox', { name: 'prénom' }).fill('Perso');
    // the same with number input
    await page.getByRole('spinbutton', { name: 'âge' }).fill('47');
    // the same with radio button
    await page.click("text=Homme");
    // Select Stade
    await page.click("text=Stade 0");
    await page.click("text=Créer le nouvel utilisateur");
    expect(page.url()).toBe('http://localhost:4200/user-create/1684739070790');
    await page.click("text=Retour en arrière");
    //expect(page.getByText('Tester')).toBeVisible();
  });

  test('Modifier l\'utilisateur', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    expect(page.url()).toBe('http://localhost:4200/admin/1684739070790');
    await page.click("text=Afficher les patients")
    await page.getByText("Modifier").nth(1).click();
    await page.getByRole('textbox', { name: 'Nom', exact: true }).fill('Testeur');
    page.on('dialog', dialog => dialog.accept());
    await page.click("text=Appliquer les modifications");
    await page.click("text=Retour");
    expect(page.getByText('Testeur')).toBeVisible();
  });

  test('test empty stats for new user', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    await page.click("text=Afficher les patients")
    /*
    *await page.click("text=Ajouter un patient");
    *await page.getByRole('textbox', { name: 'Nom', exact: true }).fill('Tester');
    *await page.getByRole('textbox', { name: 'prénom'}).fill('Perso');
    * the same with number input
    *await page.getByRole('spinbutton', { name: 'âge'}).fill('47');
    * the same with radio button
    *await page.click("text=Homme");
    * Select Stade
    *await page.click("text=Stade 0");
    *await page.click("text=Créer le nouvel utilisateur");
    *await page.click("text=Retour en arrière");
    *await expect(page.getByText('Tester')).toBeVisible();
    *
    await page.getByText(" Voir les statistiques ").nth(1).click();
    expect(page.getByText('Le patient doit jouer')).toBeVisible();

  });

  test('Supprimer l\'utilisateur', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    expect(page.url()).toBe('http://localhost:4200/admin/1684739070790');
    await page.click("text=Afficher les patients")
    await page.getByText("Supprimer le patient").nth(1).click();
    await page.click("text=Oui");
    expect(page.getByText('Testeur')).not.toBeVisible();
  });*/

});
