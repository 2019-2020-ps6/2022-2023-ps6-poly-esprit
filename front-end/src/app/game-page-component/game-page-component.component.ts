import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../service/question.service";
import {Question} from "../../models/question.models";
import {Answer} from "../../mocks/question.mock";
import {GameInstanceService} from "../../service/gameInstance.service";
import {GameInstance, GameQuestionAnswer} from "../../models/gameInstance.models";


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
  public title = 'Jouer à un quizz';
  public somethingSelected: boolean = true;
  public selectedValue?: string;
  public gameInstance: GameInstance = {} as GameInstance;
  private gameQuestionAnswers: GameQuestionAnswer[] = [];
  private score: number = 0;


  constructor(private quizService: QuizService, private route: ActivatedRoute, private questionService: QuestionService, private gameInstanceService: GameInstanceService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idQuiz'));
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
    if(this.currentQuiz && !this.currentQuiz.questions[this.currentIndex]){
      this.gameInstance.Id = "1";
      this.gameInstance.quizId = this.currentQuiz.id;
      this.gameInstance.gameQuestionsAnswers = this.gameQuestionAnswers;
      this.gameInstance.startTime = new Date();
      this.gameInstance.endTime = new Date();
      this.gameInstance.score = this.score;
      this.gameInstanceService.addGameInstance(this.gameInstance);
    }

  }


  public onSomethingSelected(isSelected: boolean) {
    this.somethingSelected = isSelected;
  }


  validate() {
    this.validateClicked = true;
    let isCorrect;
    if (document.getElementsByClassName("goodAnswer")[0].innerHTML === this.selectedValue) {
      console.log("good")
      alert("Bonne réponse")
      isCorrect = true;
      this.score++;

    } else {
      console.log("bad")
      alert("Mauvaise réponse")
      isCorrect = false;
    }
    this.gameQuestionAnswers.push({
      startDate: new Date(),
      submissionDate: new Date(),
      questionValue: this.currentQuestion?.label||"",
      answerValue:this.selectedValue||"",
      isCorrect: isCorrect,
    });

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
