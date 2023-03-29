import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../service/question.service";
import {Question} from "../../models/question.models";
import {Answer} from "../../mocks/question.mock";


@Component({
  selector: 'app-game-page-component',
  templateUrl: './game-page-component.component.html',
  styleUrls: ['./game-page-component.component.scss']
})
export class GamePageComponentComponent  implements OnInit{
  public currentQuiz:Quiz|undefined ;
  public currentQuestion:Question | undefined;
  public currentIndex:number=0;
  public validateClicked:boolean=false;
  title = 'Jouer à un quizz';
  somethingSelected: boolean = true;
  selectedValue?: string;


  constructor(private quizService: QuizService, private route: ActivatedRoute, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.currentQuiz = quizzes[id];
    });
    this.questionService.getQuestions().subscribe((questions) => {
      this.currentQuestion = questions[this.currentIndex];
    });
  }

  incrementIndexQuestion() {
    this.validateClicked = false;
    this.somethingSelected = true;
    this.currentIndex++;
    this.questionService.getQuestions().subscribe((questions) => {
      this.currentQuestion = questions[this.currentIndex];
    });
  }


  public onSomethingSelected(isSelected: boolean) {
    this.somethingSelected = isSelected;
  }


  validate() {
    this.validateClicked = true;
    if (document.getElementsByClassName("goodAnswer")[0].innerHTML === this.selectedValue) {
      console.log("good")
      alert("Bonne réponse")

    }else {
      console.log("bad")
      alert("Mauvaise réponse")
    }

   // si on regarde si this .selected value correspond à la bonne réponse, si c'est le cas on affiche un message de succès sinon on affiche un message d'échec
    // @ts-ignore



  }

  getDisable() {
    if(this.validateClicked){
      return {"display": "none"};
    }
    if(this.currentQuiz && !this.currentQuiz.questions[this.currentIndex]){
      return {"display": "none"};
    }
    return undefined;
  }

  getDisableQuestion() {
    if(this.validateClicked){
      return {"display": "block"};
    }
    return undefined;
  }

  onWhoIsSelected(value: string) {
    this.selectedValue= value;
  }
}
