import {E2EComponentFixture} from "../../../e2e/e2e-component.fixture";

export class GamePageComponentFixture extends E2EComponentFixture{

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
}
