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
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponentComponent,
    GameAnswerComponentComponent,
    GameQuestionComponentComponent,
    CreateQuizComponent,
    QuizListDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
