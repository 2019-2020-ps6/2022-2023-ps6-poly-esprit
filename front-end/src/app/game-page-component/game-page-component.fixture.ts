import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";
import { test, expect } from '@playwright/test';

export class GamePageComponentFixture extends E2EComponentFixture {

  async answerQuestion(answer: string): Promise<void> {
    await this.page.click(`text=${answer}`);
    await this.page.click('text=Valider');
  }

  async answerBadQuestion(): Promise<void> {
    const badAnswerButton = await this.page.$('.badAnswer')
    await badAnswerButton?.click();
    await this.page.click('text=Valider');
  }

  async StartQuizAsSimon(): Promise<void> {
    await this.page.click('text=Simon Beurel');
    await this.page.click('text=Acteurs');
    await this.page.click('text=Les Acteurs');
    await this.page.click('text=Carré (4 choix affichés)');
  }

  async StartQuizAsLorenzo(): Promise<void> {
    await this.page.click('text=Lorenzo Froment');
    await this.page.click('text=Acteurs');
    await this.page.click('text=Les Acteurs');
  }

  async PlayQuiz(nom: string, categorie: string, quiz: string, responses: string[], pointsAttendus: number, modeCarre: Boolean | null = null): Promise<void> {
    await this.page.click(`text=${nom}`);
    await this.page.click(`text=${categorie}`);
    await this.page.click(`text=${quiz}`);
    if (modeCarre != null) {
      if (modeCarre) {
        await this.page.click('text=Carré');
      } else {
        await this.page.click('text=Duo');
      }
    }
    for (const response of responses) {
      await this.page.getByRole("button", { name: response }).click();
      await this.page.click('text=Valider');
    }
    if (pointsAttendus == 0) {
      await expect(this.page.getByText('Dommage !')).toBeVisible();
    } else if (pointsAttendus == 1) {
      await expect(this.page.getByText(`1 point`)).toBeVisible();
    } else {
      await expect(this.page.getByText(`${pointsAttendus} points`)).toBeVisible();
    }
    await this.page.click('text=Accueil');
    await this.page.getByTestId("logoutButton").click();
  }

  async missClick() {
    await this.page.locator("h3").click();
  }

  async PlayQuizHalfMissclick(nom: string, categorie: string, quiz: string, responses: string[], pointsAttendus: number, modeCarre: Boolean | null = null): Promise<void> {
    await this.page.click(`text=${nom}`);
    await this.page.click(`text=${categorie}`);
    await this.page.click(`text=${quiz}`);
    if (modeCarre != null) {
      if (modeCarre) {
        await this.page.click('text=Carré');
      } else {
        await this.page.click('text=Duo');
      }
    }
    await this.missClick();
    for (const response of responses) {
      await this.missClick();
      await this.page.getByRole("button", { name: response }).click();
      await this.missClick();
      await this.page.getByRole("button", { name: "Valider" }).click();
    }
    if (pointsAttendus == 0) {
      await expect(this.page.getByText('Dommage !')).toBeVisible();
    } else if (pointsAttendus == 1) {
      await expect(this.page.getByText(`1 point`)).toBeVisible();
    } else {
      await expect(this.page.getByText(`${pointsAttendus} points`)).toBeVisible();
    }
    await this.page.click('text=Accueil');
    await this.page.getByTestId("logoutButton").click();
  }
}
