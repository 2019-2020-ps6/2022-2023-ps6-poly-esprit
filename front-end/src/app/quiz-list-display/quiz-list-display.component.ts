import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuizService} from "../../service/quiz.service";
import { ThemeService} from "../../service/theme.service";
import { ActivatedRoute } from '@angular/router';
import {Quiz} from "../../models/quizz.models";

@Component({
  selector: 'app-quiz-list-display',
  templateUrl: './quiz-list-display.component.html',
  styleUrls: ['./quiz-list-display.component.scss']
})

export class QuizListDisplayComponent implements OnInit {
  themeName: String = "";
  themeId: number = 0;
  quizzes: Quiz[] | undefined = [];
  title = 'Liste de quizz';

  constructor(private quizService: QuizService, private themeService: ThemeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.themeId = +this.route.snapshot.paramMap.get('idTheme')!;
    this.themeService.getTheme(this.themeId).subscribe((theme => {

      this.themeName = theme.name;
      this.quizzes = theme.quizzes;
    }))
    console.log("theme id : " + this.themeId);
    console.log("theme name : " + this.themeName);



    // this.quizService.getQuizzes().subscribe((quizzes) => {
    //   this.quizzes = quizzes;
    // });
  }
}
