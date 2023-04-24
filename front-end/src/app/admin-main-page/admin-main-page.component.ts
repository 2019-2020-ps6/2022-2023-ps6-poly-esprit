import { Component } from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {UserService} from "../../service/user.service";
import {QuizService} from "../../service/quiz.service";
import {ThemeService} from "../../service/theme.service";
import {ActivatedRoute} from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.scss']
})
export class AdminMainPageComponent {
  title = "Page de contrôle";
  admin_id: string | null;
  public UService : UserService;

  constructor(private router: Router,private route: ActivatedRoute, private userService : UserService) {
    this.admin_id = this.route.snapshot.paramMap.get('id');
    this.UService=userService;
  }

  ngOnInit(){

  }

  redirectToRoute() {
    this.router.navigate(['/themes/'+this.admin_id]);
  }
}
