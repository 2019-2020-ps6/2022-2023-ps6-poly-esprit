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
  @Input() isGoodSelected=false;
  @Input() isBadSelected=false;

  public select(value: string){
    this.isSelected=true
    this.selected.emit(value)

  }


  getButtonColor() {
    if(this.isSelected){
      return "#7BA398"
    }
    return "#C3D5D0"
  }

  getFontColor() {
    if(this.isSelected){
      return "white";
    }
    return "black";
  }

}

