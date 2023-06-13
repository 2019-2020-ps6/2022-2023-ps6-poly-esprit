import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import {expect} from "@playwright/test";

export class AdminMainPageFixture extends E2EComponentFixture {

  async clickAddQuiz(){
    return this.page.click('text=Ajouter un quiz');
  }

  async AddQuiz(name: string, theme: string){
    await this.page.getByPlaceholder("Nom du quiz").fill(name);
    await this.page.getByPlaceholder("Thème du quiz").fill(theme);
    await this.page.click('text=Créer le nouveau quiz !');
  }

  async launchQuiz(name: string, theme: string){
    await this.page.getByText(theme).click();
    await this.page.getByText(name).click();
  }

  async isThemeVisible(theme: string){
    return await expect(this.page.getByText(theme)).toBeVisible();
  }

  async isQuizVisibile(name: string, theme: string){
    return await expect(this.page.getByTestId(name+'-edit')).toBeVisible();
  }

  async isQuizNotVisible(name: string, theme: string){
    return await expect(this.page.getByTestId(name+'-edit')).not.toBeVisible();
  }

  async goOnEditQuiz(name: string, theme: string){
    await this.page.getByText(theme).click();
    const selector = `${name}-edit`
    await this.page.getByTestId(selector).click();
  }

  async deleteQuiz(name: string, theme: string){
    await this.page.click('text='+theme);
    await this.page.getByTestId(name+'-delete').click();
    await this.page.getByRole('button', { name: 'Oui' }).click();
  }


}
