import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";
import { testUrl } from '../../../e2e/e2e.config';

export class statsFixture extends E2EComponentFixture {
  async goToStats(userName: string) {
    await this.page.goto(testUrl);
    await this.page.click('text=Admin Admin');
    await this.page.click('text=Afficher les patients');
    await this.page.locator(`.${userName}-stats-btn`)?.click();
  }
}
