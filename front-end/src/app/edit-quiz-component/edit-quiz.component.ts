import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Quizz } from '../../mocks/quizz.mock';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'edit-quiz-component',
  templateUrl:  'edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent{
  public currentQuiz?:Quiz ;
  private QCService: QuizService;
  formulaire: FormGroup;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.QCService=quizService;

    this.formulaire = this.formBuilder.group({
      title: '',
      good_answer: '',
      bad_answer1: '',
      bad_answer2: '',
      bad_answer3: ''
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.currentQuiz = quizzes[id-1];
    });
  }

  addQuestion() : void {
    /**this.currentQuiz?.questions.push(
      {id: '1', label: 'Question', answers: [{type: 'text', value: 'Answer', isCorrect: true}]});*/

  }

  onSubmit() {
    console.log(this.formulaire.value.title);
    this.currentQuiz?.questions.push(
      {id: this.currentQuiz?.questions.length.toString(),
        label: this.formulaire.value.title,
        answers: [
          {type: 'text', value: this.formulaire.value.good_answer, isCorrect: true},
          {type: 'text', value: this.formulaire.value.bad_answer1, isCorrect: false},
          {type: 'text', value: this.formulaire.value.bad_answer2, isCorrect: false},
          {type: 'text', value: this.formulaire.value.bad_answer3, isCorrect: false}
        ]});
    console.log("Done");
    alert("Question ajoutée ! ");
    this.formulaire.reset();

  }
}
