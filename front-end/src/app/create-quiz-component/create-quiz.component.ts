import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'

import {QuizService} from "../../../services/quiz.service";
import {Quiz} from "../../../models/quiz.model"
import {Question} from "../../../models/question.model"

@Component({
  selector: 'app-create-quiz',
  templateUrl: 'create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  private QCService: QuizService;
  public quizForm: FormGroup;

  constructor(public quizCreateService: QuizService, public formBuilder: FormBuilder) {
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
    });
    this.QCService=quizCreateService;
  }

  ngOnInit(): void {
  }

  addQuiz(){
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    this.QCService.addQuiz(quizToCreate);
  }

}
