import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import {expect} from "@playwright/test";

export class EditQuizFixture extends E2EComponentFixture {

  async changeNameQuiz(new_name: string){
    await this.page.fill('input#title_quiz', '');
    await this.page.fill('input#title_quiz', new_name);
    await this.page.click('text=Modifier le titre du quiz');
  }

  async goBackOnAdmin(){
    await this.page.click('text=Retour');
  }

  async goOnEditQuestion(name_question: string){
    await this.page.getByTestId(name_question+'-edit').click();
  }

  async addQuestionAndGoBack(label: string, answers: string[]){

    if (label != ""){
      await this.page.fill('input#title', '');
      await this.page.fill('input#title', label);
    }

    if (answers[0] != ""){
      await this.page.fill('input#good_answer', '');
      await this.page.fill('input#good_answer', answers[0]);
    }

    if (answers[1] != ""){
      await this.page.fill('input#bad_answer1', '');
      await this.page.fill('input#bad_answer1', answers[1]);
    }

    if (answers[2] != ""){
      await this.page.fill('input#bad_answer2', '');
      await this.page.fill('input#bad_answer2', answers[2]);
    }

    if (answers[3] != ""){
      await this.page.fill('input#bad_answer3', '');
      await this.page.fill('input#bad_answer3', answers[3]);
    }

    await this.page.getByRole('button', { name: 'Ajouter une nouvelle question' }).click();
    await this.page.getByTestId('parameter').click();

  }
}
