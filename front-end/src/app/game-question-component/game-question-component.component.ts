import {Component, Input} from '@angular/core';
import {Quiz} from "../../models/quizz.models";


// Quizz list => PageComp
// Quizz => gameQuestion
@Component({
  selector: 'app-game-question-component',
  templateUrl: './game-question-component.component.html',
  styleUrls: ['./game-question-component.component.scss']
})
export class GameQuestionComponentComponent{
  @Input() quiz?: Quiz ;

}
//https://angular.io/tutorial/tour-of-heroes/toh-pt4
