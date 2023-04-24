import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'

import {QuizService} from "../../service/quiz.service";
import {Quiz} from "../../models/quizz.models";
import {ThemeService} from "../../service/theme.service";


@Component({
  selector: 'app-create-quiz',
  templateUrl: 'create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  private QCService: QuizService;
  public quizForm: FormGroup;
  private THService : ThemeService;

  constructor(public quizCreateService: QuizService, public formBuilder: FormBuilder, public themeService: ThemeService) {
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],

    });
    this.QCService=quizCreateService;
    this.THService=themeService;
  }

  ngOnInit(): void {
  }

  addQuiz(){
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    quizToCreate.id=(this.quizCreateService.quizzes.length).toString();
    quizToCreate.questions=[];
    quizToCreate.name = this.quizForm.value.name;
    this.QCService.addQuiz(quizToCreate);
    this.THService.addQuiz(quizToCreate, this.quizForm.value.theme);
  }

}
