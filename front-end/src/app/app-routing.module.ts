import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from './create-quiz-component/create-quiz.component';
import {QuizListDisplayComponent} from "./quiz-list-display/quiz-list-display.component";
const routes: Routes = [
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'display-quiz-list', component: QuizListDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
