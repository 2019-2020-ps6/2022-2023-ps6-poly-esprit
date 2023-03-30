import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {GameAnswerComponentComponent} from "./game-answer-component/game-answer-component.component";
import {GameQuestionComponentComponent} from "./game-question-component/game-question-component.component";
import {GamePageComponentComponent} from "./game-page-component/game-page-component.component";
import { CreateQuizComponent } from './create-quiz-component/create-quiz.component';
import {QuizListDisplayComponent} from "./quiz-list-display/quiz-list-display.component";
import {AppComponent} from "./app.component";
import {EditQuizComponent} from "./edit-quiz-component/edit-quiz.component";
import {DeleteQuizComponent} from "./delete-quiz-component/delete-quiz.component";
import {UserListDisplayComponent} from "./user-list-display/user-list-display.component";

const routes: Routes = [

  {path: 'game-answer-component', component: GameAnswerComponentComponent},
  {path: 'game-question-component', component: GameQuestionComponentComponent},
  {path: 'game-page/:idQuiz/:idUser', component: GamePageComponentComponent},
  {path: 'create-quiz', component: CreateQuizComponent },
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'delete-quiz/:id', component: DeleteQuizComponent},
  {path: '', component: UserListDisplayComponent},
  {path: 'quiz-list/:idUser', component: QuizListDisplayComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
