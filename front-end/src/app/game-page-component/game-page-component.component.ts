import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
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
export class GamePageComponentComponent  implements OnInit, AfterViewInit{
  public currentQuiz:Quiz|undefined ;
  public currentQuestion:string | undefined;
  public currentIndex:number=0;
  public validateClicked:boolean=false;
  public clicks = 0;
  public valid_clicks = 0;
  public title = 'Jouer à un quizz';
  public somethingSelected: boolean = true;
  public selectedValue?: string;
  public gameInstance: GameInstance = {} as GameInstance;
  private gameQuestionAnswers: GameQuestionAnswer[] = [];
  private score: number = 0;
  public userId:number;
  public currentPathPicture: string | undefined;
  @Input() quiz?: Quiz ;
  @Input() clicked?: boolean;


  constructor(private quizService: QuizService, private route: ActivatedRoute, private questionService: QuestionService, private gameInstanceService: GameInstanceService) {
    this.userId = Number(this.route.snapshot.paramMap.get('idUser'));

  }

  ngAfterViewInit(): void {
    this.attractedButton();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idQuiz'));
    this.currentQuiz = this.quizService.getQuiz(id.toString());
    this.currentQuestion = this.currentQuiz?.questions[this.currentIndex].label;
    this.currentPathPicture = this.currentQuiz?.questions[this.currentIndex].path_picture;
    //console.log("LOG SIMON BEUREL " +this.currentPathPicture);
  }

  incrementIndexQuestion() {
    this.validateClicked = false;
    this.somethingSelected = true;


    if(this.currentQuiz && this.currentQuiz.questions[this.currentIndex]){
      this.gameInstance.Id = "1";
      this.gameInstance.quizId = this.currentQuiz.id;
      this.gameInstance.gameQuestionsAnswers = this.gameQuestionAnswers;
      this.gameInstance.startTime = new Date();
      this.gameInstance.endTime = new Date();
      this.gameInstance.score = this.score;
      this.gameInstanceService.addGameInstance(this.gameInstance);
    }
    this.currentIndex++;
    if (this.currentQuiz?.questions[this.currentIndex]!=undefined){
      this.currentQuestion = this.currentQuiz?.questions[this.currentIndex].label;
      this.currentPathPicture = this.currentQuiz?.questions[this.currentIndex].path_picture;
    }
  }

  private attractedButton() {
    const buttons = document.querySelectorAll('button');

    const window = document.querySelector('body');

    buttons.forEach(button => {
      window?.addEventListener('mousemove', e => {

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const buttonX = button.offsetLeft + button.clientWidth / 2;
        const buttonY = button.offsetTop + button.clientHeight / 2;

        const buttonLeft = button.offsetLeft;
        const buttonRight = button.offsetLeft + button.clientWidth;
        const buttonTop = button.offsetTop;
        const buttonBottom = button.offsetTop + button.clientHeight;

        const distanceLeft = Math.sqrt((mouseX - buttonLeft) ** 2 + (mouseY - buttonY) ** 2);
        const distanceRight = Math.sqrt((mouseX - buttonRight) ** 2 + (mouseY - buttonY) ** 2);
        const distanceTop = Math.sqrt((mouseX - buttonX) ** 2 + (mouseY - buttonTop) ** 2);
        const distanceBottom = Math.sqrt((mouseX - buttonX) ** 2 + (mouseY - buttonBottom) ** 2);

        // Trouver la distance minimale
        const minDistance = Math.min(distanceLeft, distanceRight, distanceTop, distanceBottom);

        if (minDistance < 90) { // 90 = rayon du bouton
          button.style.transform = 'scale(1.5)';
          if(button.classList.contains('btn-hide-recap')) {
            button.style.background = 'lightgrey';
          }
        } else {
          button.style.transform = 'scale(1)';
          if(button.classList.contains('btn-hide-recap')) {
            button.style.background = '';
          }
        }
      });
    })
    console.log("Listes des boutons",buttons);
  }

  public onSomethingSelected(isSelected: boolean) {
    this.somethingSelected = isSelected;
  }

  public onClick() {
    this.clicks++;
    console.log("clicks", this.clicks, "valid_clicks", this.valid_clicks);
  }

  validate() {
    this.incrementIndexQuestion()
    this.validateClicked = true;
    this.onValideClick()
    let isCorrect;
    if (document.getElementsByClassName("goodAnswer")[0].innerHTML === this.selectedValue) {
      isCorrect = true;
      this.score++;

    } else {
      isCorrect = false;
    }

    this.gameQuestionAnswers.push({
      startDate: new Date(),
      submissionDate: new Date(),
      questionValue: this.currentQuestion||"",
      answerValue:this.selectedValue||"",
      isCorrect: isCorrect,
    });
  }

  onWhoIsSelected(value: string) {
    this.selectedValue = value;
  }

  onValideClick() {
    this.valid_clicks++;
  }
}
