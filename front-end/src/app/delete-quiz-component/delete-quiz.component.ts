import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Quizz } from '../../mocks/quizz.mock';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'edit-quiz-component',
  templateUrl:  'edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class DeleteQuizComponent{
  public currentQuiz?:Quiz ;
  private QCService: QuizService;
  formulaire: FormGroup;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

  }



  onSubmit() {

  }
}
