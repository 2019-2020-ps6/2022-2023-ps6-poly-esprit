import {Component, Input} from '@angular/core';
import {} from "../../models/quizz.models"
import {Answer} from "../../models/question.models";

@Component({
  selector: 'app-game-answer-component',
  templateUrl: './game-answer-component.component.html',
  styleUrls: ['./game-answer-component.component.scss']
})
export class GameAnswerComponentComponent {
  @Input() answer?: Answer;
}
