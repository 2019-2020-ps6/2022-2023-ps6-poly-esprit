import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StatsFeature extends E2EComponentFixture {
  getStats() {
    return this.page.waitForSelector('app-quiz-form');
  }

  getInput(is_click: boolean) {
    const selector = `app-stats-visualisation`;
    return this.page.waitForSelector(selector);
  }

  getCreateButton() {
   return this.page.getByRole('button', { name: 'Create' });
  }

  clickCreateButton() {
    return this.getCreateButton().click();
  }
}