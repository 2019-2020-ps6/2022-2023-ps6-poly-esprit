import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Quizz } from '../../mocks/quizz.mock';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {ThemeService} from "../../service/theme.service";
import {UserService} from "../../service/user.service";
import { Router } from '@angular/router';


@Component({
  selector: 'user-delete',
  templateUrl:  'user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {
  public currentQuiz?: Quiz;
  public UService : UserService;
  formulaire: FormGroup;
  id_user: string | null = "";
  id_admin: string | null ="";

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private userService : UserService, private router: Router) {
    this.UService=userService;
    this.formulaire = this.formBuilder.group({},{});
  }

  ngOnInit(): void {
    this.id_user = this.route.snapshot.paramMap.get('id');
    this.id_admin = this.route.snapshot.paramMap.get('id_user');
  }


  onSubmit() {
    if(this.id_user!=null){
      this.UService.deleteUserWithId(this.id_user);
      alert("L'utilisateur a bien été supprimé ! Vous pouvez revenir à la page principale");
      //redirection to /management-users/:id
      this.router.navigate(['/management-users',this.id_admin]);
    }
  }
}
