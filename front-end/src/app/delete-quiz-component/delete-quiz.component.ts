import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Quizz } from '../../mocks/quizz.mock';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'delete-quiz',
  templateUrl:  'delete-quiz.component.html',
  styleUrls: ['./delete-quiz.component.scss']
})
export class DeleteQuizComponent {
  public currentQuiz?: Quiz;
  private QCService: QuizService;
  formulaire: FormGroup;
  id_quiz: string | null = "";

  constructor(private quizService: QuizService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.QCService = quizService;

    this.formulaire = this.formBuilder.group({},{});
  }

  ngOnInit(): void {
    this.id_quiz = this.route.snapshot.paramMap.get('id');
  }


  onSubmit() {
    if(this.id_quiz!=null){
      this.QCService.deleteQuiz(this.id_quiz);
      alert("Le quiz a bien été supprimé de la liste, vous pouvez revenir sur la page principale");
    }
  }
}
