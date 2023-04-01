import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {GameAnswerComponentComponent} from "./game-answer-component/game-answer-component.component";
import {GameQuestionComponentComponent} from "./game-question-component/game-question-component.component";
import {GamePageComponentComponent} from "./game-page-component/game-page-component.component";
import { CreateQuizComponent } from './create-quiz-component/create-quiz.component';
import {QuizListDisplayComponent} from "./quiz-list-display/quiz-list-display.component";
import {AppComponent} from "./app.component";
import {ThemeListDisplayComponentComponent} from "./theme-list-display-component/theme-list-display-component.component";
import {EditQuizComponent} from "./edit-quiz-component/edit-quiz.component";
import {ParameterPageComponent} from "./parameter-page/parameter-page.component";
import {DeleteQuizComponent} from "./delete-quiz-component/delete-quiz.component";
import {UserListDisplayComponent} from "./user-list-display/user-list-display.component";
import {AddUserComponent} from "./add-user-component/add-user-component";


const routes: Routes = [

  {path: 'game-answer-component', component: GameAnswerComponentComponent},
  {path: 'game-question-component', component: GameQuestionComponentComponent},
  {path: 'game-page/:idQuiz/:idUser', component: GamePageComponentComponent},
  {path: 'create-quiz', component: CreateQuizComponent },
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'delete-quiz/:id', component: DeleteQuizComponent},
  {path: '', component: UserListDisplayComponent},
  {path: 'quiz-list/:idUser', component: QuizListDisplayComponent },
  {path: 'user-create', component: AddUserComponent},
  {path: 'themes', component: ThemeListDisplayComponentComponent},
  {path: 'themes/:idTheme/:idUser', component: QuizListDisplayComponent },
  {path: 'parametre', component:ParameterPageComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
