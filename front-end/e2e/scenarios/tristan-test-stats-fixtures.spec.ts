import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { StatsFeature } from 'src/app/stats-visualisation/stats-visualisation.fixture';

test.describe('Test initial\nCréer et modifier un patient', () => {

  test('Créer l\'utilisateur', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    await page.click("text=Afficher les patients")
    await page.click("text=Ajouter un patient");
    await page.getByRole('textbox', { name: 'Nom', exact: true }).fill('Tester');
    await page.getByRole('textbox', { name: 'prénom' }).fill('Perso');
    await page.getByRole('spinbutton', { name: 'âge' }).fill('47');
    await page.click("text=Homme");
    await page.click("text=Stade 0");
    await page.click("text=Créer le nouvel utilisateur");
    await page.click("text=Retour en arrière");
  });

  test('test empty stats for new user', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    await page.click("text=Afficher les patients")
    await page.getByText(" Voir les statistiques ").nth(1).click();
    expect(page.getByText('Le patient doit jouer')).toBeVisible();

  });

  test('Supprimer l\'utilisateur', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    await page.click("text=Afficher les patients")
    await page.getByText("Supprimer le patient").nth(1).click();
    await page.click("text=Oui");
  });

});
