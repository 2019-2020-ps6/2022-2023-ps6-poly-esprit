import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {Answer, Question} from "../../models/question.models";
import {mockUser} from "../../mocks/user.mock";
import {QuestionService} from "../../service/question.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {of} from "rxjs";



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
  @Output() valideClick = new EventEmitter<boolean>();
  @Output() somethingSelected = new EventEmitter<boolean>();
  @Output() whoIsSelected = new EventEmitter<string>();
  public howPathology: number | undefined;
  currentValue? : string;
  public random;
  public answerIsDuo: boolean = false;
  public answerIsCarre: boolean = false;
  public answerIsCash: boolean = false;
  public answerIsChoice: boolean = false;


  constructor(private route: ActivatedRoute, private userService: UserService) {
    const id = this.route.snapshot.paramMap.get('idUser');
    const user = this.userService.getUserById(Number(id));
    user.subscribe((user) => { this.howPathology = user.pathology });
    console.log("log dans gameQuestion",this.howPathology)
    this.random = Math.floor(Math.random() * 3);


  }

  ngOnInit(): void {
    if(this.howPathology===4){
      this.answerIsDuo=true;
    }
    if(this.howPathology===2 || this.howPathology===3){
      this.answerIsCarre=true;
    }
    if(this.howPathology===1  || this.howPathology===0){
      this.answerIsChoice=true;
    }
    console.log("log dans gameQuestion",this.howPathology)

  }
  public onSelected(value:string){
    this.currentValue=value;
    this.somethingSelected.emit(false);

    if(this.answerIsCash){
      this.whoIsSelected.emit(document.getElementById("cash")?.innerHTML);
    }else{
      this.whoIsSelected.emit(value);
    }
  }



  getAnswerDuo() {
    if(this.question) {
      let returnAnswers: Answer[] = [];
      let cloneAnswers: Answer[] = [];
      for (let answer of this.question?.answers) {
        if (!answer.isCorrect) {
          cloneAnswers.push(answer)
        }
      }
      for (let answer of this.question?.answers) {
        if (answer.isCorrect) {
          returnAnswers.push(answer)
        }
      }
      returnAnswers.push(cloneAnswers[this.random]);
      return returnAnswers;
    }
    return;
  }

  getAnswerCarre() {
    return this.question?.answers
  }
  isDuo() {
    this.answerIsDuo = true;
    this.answerIsChoice = false;

  }
  isCarre() {
    this.answerIsCarre = true;
    this.answerIsChoice = false;

  }

  onValideClick() {
    this.valideClick.emit(true);
  }

}
//https://angular.io/tutorial/tour-of-heroes/toh-pt4
