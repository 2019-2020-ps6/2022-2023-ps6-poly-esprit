import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";
import { expect } from "@playwright/test";

export class EditQuestionComponentFixture extends E2EComponentFixture {

  async changeValuesQuestionAndGoBack(name: string, answers: string[]) {

    if (name != "") {
      await this.page.fill('input#title', '');
      await this.page.fill('input#title', name);
    }

    if (answers[0] != "") {
      await this.page.fill('input#good_answer', '');
      await this.page.fill('input#good_answer', answers[0]);
    }

    if (answers[1] != "") {
      await this.page.fill('input#bad_answer1', '');
      await this.page.fill('input#bad_answer1', answers[1]);
    }

    if (answers[2] != "") {
      await this.page.fill('input#bad_answer2', '');
      await this.page.fill('input#bad_answer2', answers[2]);
    }

    if (answers[3] != "") {
      await this.page.fill('input#bad_answer3', '');
      await this.page.fill('input#bad_answer3', answers[3]);
    }

    await this.page.click('text=Appliquer les modifications');
    await this.page.getByTestId('parameter').click();
  }

}
