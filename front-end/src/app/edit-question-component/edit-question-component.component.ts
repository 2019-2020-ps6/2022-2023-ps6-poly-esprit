import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Quizz } from '../../mocks/quizz.mock';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../models/question.models";
import {QuestionService} from "../../service/question.service";

@Component({
  selector: 'edit-question-component',
  templateUrl: './edit-question-component.component.html',
  styleUrls: ['./edit-question-component.component.scss']
})
export class EditQuestionComponent {
  public currentQuestion?:Question ;
  private QUService: QuestionService;
  formulaire: FormGroup;
  questions: Question[] | undefined = [];
  id_quiz: string | null = "";
  id_user: string | null = "";

  constructor(private questionService: QuestionService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.QUService=questionService;
    this.formulaire = this.formBuilder.group({
      title: '',
      good_answer: '',
      bad_answer1: '',
      bad_answer2: '',
      bad_answer3: ''
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))-1;
    this.id_quiz = this.route.snapshot.paramMap.get('id_quiz');
    this.id_user = this.route.snapshot.paramMap.get('id_user');
    console.log(id)
    this.questionService.getQuestions().subscribe((questions) => {
      this.currentQuestion = questions[id];
    });
    this.updateForm();
  }

  updateForm(){
    this.formulaire.patchValue({
      title: this.currentQuestion?.label,
      good_answer: this.currentQuestion?.answers[0].value,
      bad_answer1: this.currentQuestion?.answers[1].value,
      bad_answer2: this.currentQuestion?.answers[2].value,
      bad_answer3: this.currentQuestion?.answers[3].value
    })
  }

  onSubmit() {
    //Get the value of the "title" in formulaire and assign it to the title of the current question
    if(this.currentQuestion){
      this.currentQuestion.label = this.formulaire.value.title;
      this.currentQuestion.answers[0].value = this.formulaire.value.good_answer;
      this.currentQuestion.answers[1].value = this.formulaire.value.bad_answer1;
      this.currentQuestion.answers[2].value = this.formulaire.value.bad_answer2;
      this.currentQuestion.answers[3].value = this.formulaire.value.bad_answer3;
    }
    alert("La question a été mise à jour !");
  }
}
