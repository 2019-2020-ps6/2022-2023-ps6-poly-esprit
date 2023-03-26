import {Component, OnInit} from '@angular/core';
import { Quizz } from '../../mocks/quizz.mock';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-game-page-component',
  templateUrl: './game-page-component.component.html',
  styleUrls: ['./game-page-component.component.scss']
})
export class GamePageComponentComponent  {
  public currentQuiz?:Quiz ;


  constructor(private quizService: QuizService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.currentQuiz = quizzes[id];
    });
  }





}
