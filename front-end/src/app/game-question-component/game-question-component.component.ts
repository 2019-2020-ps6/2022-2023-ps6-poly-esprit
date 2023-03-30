import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {Answer, Question} from "../../models/question.models";
import {mockUser} from "../../mocks/user.mock";
import {QuestionService} from "../../service/question.service";
import {ActivatedRoute} from "@angular/router";


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
  @Output() somethingSelected=new EventEmitter<boolean>();
  @Output() whoIsSelected=new EventEmitter<string>();
  public howPathology: number | undefined;
  currentValue? : string;
  public random ;


  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('idUser');
    for(let user of mockUser){
      if(user.id===id){
        this.howPathology=user.pathology;
      }
    }
    this.random = Math.floor(Math.random() * 3);
  }
  ngOnInit(): void {
  }
  public onSelected(value:string){
    this.currentValue=value
    this.somethingSelected.emit(false);
    this.whoIsSelected.emit(value);
  }

  getAnswerWithTypeOfUser() {
    if (this.howPathology==2 || this.howPathology==3) {
      return this.question?.answers
    }
    if(this.howPathology==4 && this.question?.answers){
      let returnAnswers: Answer[] = [];
      let cloneAnswers: Answer[] = [];
      for(let answer of this.question?.answers){
        if(!answer.isCorrect){
          cloneAnswers.push(answer)
        }
      }
      for(let answer of this.question?.answers){
        if(answer.isCorrect){
          returnAnswers.push(answer)
        }
      }
      returnAnswers.push(cloneAnswers[this.random]);
      console.log(cloneAnswers[this.random])
      console.log(this.random)
      return returnAnswers;
    }
    return;
  }
}
//https://angular.io/tutorial/tour-of-heroes/toh-pt4
