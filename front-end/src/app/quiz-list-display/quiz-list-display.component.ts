import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-quiz-list-display',
  templateUrl: './quiz-list-display.component.html',
  styleUrls: ['./quiz-list-display.component.scss']
})
export class QuizListDisplayComponent implements OnInit {
  quizzes: any[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }

}
