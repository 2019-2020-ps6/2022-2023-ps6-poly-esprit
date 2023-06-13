import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Test poubelle pour Simon Beurel', () => {

  /**test('Basic test pour vérifier si on choppe le texte', async ({ page }) => {
    await page.goto(testUrl);
    await expect(page.getByText('Admin Admin')).toBeVisible();
  });

  test('Test pour vérifier une redirection sur la page admin', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    await expect(page.url()).toBe('http://localhost:4200/admin/1684739070790');
  });

  test('Vérifier que les boutons deviennent plus gros', async ({ page }) => {
    await page.goto(testUrl);
    await page.click('text=Simon Beurel');
    await page.getByText('Acteurs').click();
    await page.click('text=Les Acteurs');
    const bouton = await page.getByRole('button', { name: 'Carré (4 choix affichés)' });
    const tailleBeforeEdit = await bouton.boundingBox();
    await page.getByTestId('parameter').click();
    await page.getByTestId('big_buttons').click();
    await page.click('text=Retour');
    const bouton2 = page.getByRole('button', { name: 'Carré (4 choix affichés)' });
    const tailleAfterEdit = await bouton2.boundingBox();
    // @ts-ignore
    expect(tailleBeforeEdit.height < tailleAfterEdit.height);
  });

  /**test('Vérifier que l on puisse ajouter un utilisateur', async ({page}) =>{

    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    await page.click('text=Afficher les patients');
    await page.click('text=Ajouter un patient');

    await page.fill('input[formControlName="nom"]', 'John');
  })//NOT CONTINUE BECAUSE QUENTIN MAUROIS DIT IT

  test('Verifier que l on peut ajouter un quiz sans que le théme soit crée', async ({page}) =>{

    await page.goto(testUrl);
    await page.click('text=Admin Admin');
    await page.click('text=Ajouter un quiz');

    await page.getByPlaceholder("Nom du quiz").fill("TestQuiz");
    await page.getByPlaceholder("Thème du quiz").fill("Test");

    await page.click('text=Créer le nouveau quiz !');

    await expect(page.getByText('Test')).toBeVisible();

    await page.click('text=Test');

    await expect(page.getByText('TestQuiz')).toBeVisible();
  });*/


});
