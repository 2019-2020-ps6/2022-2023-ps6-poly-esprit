import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GamePageComponentComponent } from './game-page-component/game-page-component.component';
import { GameAnswerComponentComponent } from './game-answer-component/game-answer-component.component';
import { GameQuestionComponentComponent } from './game-question-component/game-question-component.component';
import {CreateQuizComponent} from "./create-quiz-component/create-quiz.component";
import {QuizService} from "../service/quiz.service";
import { QuizListDisplayComponent } from './quiz-list-display/quiz-list-display.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ThemeListDisplayComponentComponent } from './theme-list-display-component/theme-list-display-component.component';
import { HeaderComponent } from './header/header.component';
import {EditQuizComponent} from "./edit-quiz-component/edit-quiz.component";
import { ParameterPageComponent } from './parameter-page/parameter-page.component';
import {AdaptConfigDirective} from "../Directives/adapt-config.directive";
import {DeleteQuizComponent} from "./delete-quiz-component/delete-quiz.component";
import {GameEndComponentComponent} from "./game-end-component/game-end-component.component";
import {UserListDisplayComponent} from "./user-list-display/user-list-display.component";
import {AddUserComponent} from "./add-user-component/add-user-component";

import { StatsVisualisationComponent } from './stats-visualisation/stats-visualisation.component';
import {UserEditComponent} from "./user-edit-component/user-edit.component";
import {UserDeleteComponent} from "./user-delete-component/user-delete.component";
import { StatsChartComponent } from './stats-chart/stats-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {AdaptConfigThemeDirective} from "../Directives/adapt-config-theme.directive";
import { EditQuestionComponent } from './edit-question-component/edit-question-component.component';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { AdminManagementUsersComponent } from './admin-management-users/admin-management-users.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    GamePageComponentComponent,
    GameAnswerComponentComponent,
    GameQuestionComponentComponent,
    CreateQuizComponent,
    QuizListDisplayComponent,
    ThemeListDisplayComponentComponent,
    HeaderComponent,
    EditQuizComponent,
    ParameterPageComponent,
    AdaptConfigDirective,
    AdaptConfigThemeDirective,
    DeleteQuizComponent,
    GameEndComponentComponent,
    UserListDisplayComponent,
    DeleteQuizComponent,
    AddUserComponent,
    UserDeleteComponent,
    UserEditComponent,
    StatsVisualisationComponent,
    StatsChartComponent,
    EditQuestionComponent,
    AdminMainPageComponent,
    AdminManagementUsersComponent
  ],
  imports: [
    NgApexchartsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
