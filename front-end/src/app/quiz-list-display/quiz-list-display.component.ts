import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuizService} from "../../service/quiz.service";
import { ThemeService} from "../../service/theme.service";
import { ActivatedRoute } from '@angular/router';
import {Quiz} from "../../models/quizz.models";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-quiz-list-display',
  templateUrl: './quiz-list-display.component.html',
  styleUrls: ['./quiz-list-display.component.scss']
})

export class QuizListDisplayComponent implements OnInit {
  themeName: String = "";
  themeId: number = 0;
  quizzes: Quiz[] | undefined = [];
  title = 'Liste des quizz';
  public idUser: string | null;
  public showDeleteButton: boolean = false;
  public showEditButton: boolean = false;
  public UService : UserService;

  constructor(private quizService: QuizService, private themeService: ThemeService, private route: ActivatedRoute, private userService : UserService) {
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.UService=userService;
  }

  ngOnInit(): void {
    this.themeId = +this.route.snapshot.paramMap.get('idTheme')!;
    this.themeService.getTheme(this.themeId).subscribe((theme => {

      this.themeName = theme.name;
      this.quizzes = theme.quizzes;
    }))
    console.log("theme id : " + this.themeId);
    console.log("theme name : " + this.themeName);

    if(this.idUser){
      if (this.userService.isAdmin(this.idUser)) {
        this.showDeleteButton = true;
        this.showEditButton = true;
      }
    }
  }

  recherche(event: any) {
    let inputValue = ''
    inputValue = event.target.value ;
    this.themeService.getTheme(this.themeId).subscribe((theme) => {
      if (theme.quizzes!=undefined) {
        this.quizzes = theme.quizzes.filter((quiz) => {
          return quiz.name.toLowerCase().includes(inputValue.toLowerCase());
        });
      }
    });
  }
}
