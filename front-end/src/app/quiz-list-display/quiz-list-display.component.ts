import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuizService} from "../../service/quiz.service";
import {Quiz} from "../../models/quizz.models";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-quiz-list-display',
  templateUrl: './quiz-list-display.component.html',
  styleUrls: ['./quiz-list-display.component.scss']
})
export class QuizListDisplayComponent implements OnInit {
  quizzes: any[] = [];
  title = 'Liste de quizz';
  public idUser: string | null;

  constructor(private quizService: QuizService, private route: ActivatedRoute) {
    this.idUser = this.route.snapshot.paramMap.get('idUser');
  }

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });


  }
}
