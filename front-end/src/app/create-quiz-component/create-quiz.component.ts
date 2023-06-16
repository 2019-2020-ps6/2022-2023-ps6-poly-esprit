import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'

import {QuizService} from "../../service/quiz.service";
import {Quiz} from "../../models/quizz.models";
import {ThemeService} from "../../service/theme.service";
import {Theme} from "../../models/theme.models";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-create-quiz',
  templateUrl: 'create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  private QCService: QuizService;
  public quizForm: FormGroup;
  private THService : ThemeService;
  id_user: string | null = "";

  constructor(public quizCreateService: QuizService, public formBuilder: FormBuilder, public themeService: ThemeService, private route: ActivatedRoute) {
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],

    });
    this.QCService=quizCreateService;
    this.THService=themeService;
  }

  ngOnInit(): void {
    this.id_user = this.route.snapshot.paramMap.get('id_user');
  }

  addQuiz(){
    const quizToCreate = this.quizForm.getRawValue() as Quiz;

    quizToCreate.name = this.quizForm.value.name;

    const themeToCreate : Theme = this.quizForm.getRawValue() as Theme;
    themeToCreate.name=this.quizForm.value.theme;

    if(quizToCreate.name == "" || themeToCreate.name == ""){
      alert("Veuillez remplir tous les champs");
      return;
    }
    this.THService.addQuiz(this.quizForm.value.name, this.quizForm.value.theme);
    this.QCService.addQuiz(this.quizForm.value.name);
  }

}
