import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../service/question.service";
import {Question} from "../../models/question.models";


@Component({
  selector: 'app-game-page-component',
  templateUrl: './game-page-component.component.html',
  styleUrls: ['./game-page-component.component.scss']
})
export class GamePageComponentComponent  implements OnInit{
  public currentQuiz?:Quiz ;
  public currentQuestion?:Question;
  public currentIndex:number=0;
  title = 'Jouer à un quizz';

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
    this.currentIndex++;
    this.questionService.getQuestions().subscribe((questions) => {
      this.currentQuestion = questions[this.currentIndex];
    });
  }

  decrementIndexQuestion() {
    this.currentIndex--;
    this.questionService.getQuestions().subscribe((questions) => {
      this.currentQuestion = questions[this.currentIndex];
    });
  }





}
