import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

// Scénario de test du nom du titre de la page

test.describe('Test Page Name', () => {
  test('Test Name', async ({ page }) => {
    await page.goto(testUrl);

    const pageTitle = await page.getByRole("heading", {name: "Votre titre"})
    expect(pageTitle).toBeVisible();
  })

  test('Test Creation Users', async ({ page}) => {
    await page.goto(testUrl);

    await page.click('text=Admin Admin')

    await expect(page.url()).toBe('http://localhost:4200/admin/1684739070790');

    await page.click("text=Afficher les patients");

    await expect(page.url()).toBe('http://localhost:4200/management-users/1684739070790');

    await page.click('text=Ajouter un patient');

    await expect(page.url()).toBe('http://localhost:4200/user-create/1684739070790');

    const inputNom = await page.$('#nom');
    await inputNom?.type('Bowser');

    const inputPrenom = await page.$('#prenom');
    await inputPrenom?.type('Mario');

    const inputAge = await page.$('#age');
    await inputAge?.type('25');

    await page.click('text=Homme');

    await page.click('text=Stade 0');

    await page.click('text=Créer le nouvel utilisateur');

    await page.click('text=retour');

    const nomUtilisateur = await page.getByRole('heading', {name:"Bowser"});
    expect(nomUtilisateur).toBeVisible();

    await page.locator('.Bowser-delete-btn').click();

    await page.click('text=oui');

    expect(nomUtilisateur).not.toBeVisible();

  })
})
