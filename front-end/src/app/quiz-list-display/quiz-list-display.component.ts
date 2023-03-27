import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuizService} from "../../service/quiz.service";
import {Quiz} from "../../models/quizz.models";

@Component({
  selector: 'app-quiz-list-display',
  templateUrl: './quiz-list-display.component.html',
  styleUrls: ['./quiz-list-display.component.scss']
})
export class QuizListDisplayComponent implements OnInit {
  quizzes: any[] = [];
  title = 'Quiz List';

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }
}
