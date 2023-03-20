import {Component, EventEmitter, Input, Output} from '@angular/core';
import {} from "../../models/quizz.models"
import {Answer} from "../../models/question.models";

@Component({
  selector: 'app-game-answer-component',
  templateUrl: './game-answer-component.component.html',
  styleUrls: ['./game-answer-component.component.scss']
})
export class GameAnswerComponentComponent {
  @Input() answer?: Answer;
  @Output() selected=new EventEmitter<string>();
  @Input() isSelected=false
  public select(value: string){
    console.log(value)
    this.isSelected=true
    this.selected.emit(value)
  }
}

