import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {Question} from "../../models/question.models";
import {QuestionService} from "../../service/question.service";
import {GameInstance} from "../../models/gameInstance.models";


// Quizz list => PageComp
// Quizz => gameQuestion
@Component({
  selector: 'app-game-end-component',
  templateUrl: './game-end-component.component.html',
  styleUrls: ['./game-end-component.component.scss']
})
export class GameEndComponentComponent implements OnInit {
  @Input() gameInstance?: GameInstance;
  ngOnInit(): void {
    console.log("C'est moiiiiiiiiiiiiiii",this.gameInstance)
  }


}
//https://angular.io/tutorial/tour-of-heroes/toh-pt4
