import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CreateQuizComponent} from "./create-quiz-component/create-quiz.component";
import {QuizService} from "../../services/quiz.service";
import { QuizListDisplayComponent } from './quiz-list-display/quiz-list-display.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateQuizComponent,
    QuizListDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
