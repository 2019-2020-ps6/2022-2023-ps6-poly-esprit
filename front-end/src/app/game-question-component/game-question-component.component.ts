import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {GameServiceService} from "../../service/game-service.service";


// Quizz list => PageComp
// Quizz => gameQuestion
@Component({
  selector: 'app-quiz',
  templateUrl: './game-question-component.component.html',
  styleUrls: ['./game-question-component.component.scss']
})
export class GameQuestionComponentComponent implements OnInit{
  @Input() quiz: Quiz | undefined ;
  currentQuiz: Quiz | undefined;

  constructor() {
    //this.currentQuiz =
  }
  ngOnInit(): void {
  }


}
//https://angular.io/tutorial/tour-of-heroes/toh-pt4
