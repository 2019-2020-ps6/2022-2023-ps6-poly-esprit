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
  public currentQuestion?:Question
  @Input() quiz?: Quiz ;
  @Input() currentIndex:number = 0;


  currentValue? : string;
  constructor(private questionService: QuestionService) {
  }
  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((questions) => {
      this.currentQuestion = questions[this.currentIndex];
    });
  }
  public onSelected(value:string){
    console.log('from parent:', value )
    this.currentValue=value
  }


}
//https://angular.io/tutorial/tour-of-heroes/toh-pt4
