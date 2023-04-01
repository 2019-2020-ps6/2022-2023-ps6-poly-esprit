import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Quizz } from '../../mocks/quizz.mock';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {ThemeService} from "../../service/theme.service";
import {UserService} from "../../service/user.service";


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

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private userService : UserService) {
    this.UService=userService;
    this.formulaire = this.formBuilder.group({},{});
  }

  ngOnInit(): void {
    this.id_user = this.route.snapshot.paramMap.get('id');
  }


  onSubmit() {
    if(this.id_user!=null){
      this.UService.deleteUserWithId(this.id_user);
      alert("L'utilisateur a bien été supprimé ! Vous pouvez revenir à la page principale");
    }
  }
}
