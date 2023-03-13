import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../../services/quiz.service";


@Component({
  selector: 'app-create-quiz',
  templateUrl: 'create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  private QCService: QuizService;

  constructor(private quizCreateService: QuizService) {
    this.QCService = quizCreateService;
  }

  ngOnInit(): void {
  }

  addQuiz(name: string, theme: string, id:string, questions: []){
    this.QCService.addQuiz({questions: questions, name:name, theme:theme, id:id});
  }

}
