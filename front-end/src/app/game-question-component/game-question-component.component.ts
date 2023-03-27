import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {Question} from "../../models/question.models";
import {QuestionService} from "../../service/question.service";


// Quizz list => PageComp
// Quizz => gameQuestion
@Component({
  selector: 'app-game-question-component',
  templateUrl: './game-question-component.component.html',
  styleUrls: ['./game-question-component.component.scss']
})
export class GameQuestionComponentComponent implements OnInit{
  @Input() quiz?: Quiz ;
  @Input() question?: Question;
  currentValue? : string;

  constructor() {
  }
  ngOnInit(): void {

  }
  public onSelected(value:string){
    console.log('from parent:', value )
    this.currentValue=value
  }


}
//https://angular.io/tutorial/tour-of-heroes/toh-pt4
