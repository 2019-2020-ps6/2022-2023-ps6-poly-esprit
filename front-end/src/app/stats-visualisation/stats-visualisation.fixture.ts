import { testUrl } from "e2e/e2e.config";
import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";


export class statsFixture extends E2EComponentFixture {
  
  async generateScreenshots() {
    return;
    await this.page.goto(testUrl);
    await this.goToStats('Beurel');
    await this.page.locator('apx-chart').screenshot({ animations : 'disabled', path: "e2e/screens/stats100.png" });
    await this.page.getByRole('button', { name: 'réponses' }).click();
    await this.page.locator('apx-chart').screenshot({ animations : 'disabled', path: "e2e/screens/stats50.png" });
    await this.page.goto(testUrl);
  }
  
  async goToStats(userName: string) {
    await this.page.goto(testUrl);
    await this.page.click('text=Admin Admin');
    await this.page.click('text=Afficher les patients');
    await this.page.locator(`.${userName}-stats-btn`)?.click();
  }
}