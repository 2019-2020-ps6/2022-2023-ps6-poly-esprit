import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Quizz } from '../../mocks/quizz.mock';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../models/question.models";


@Component({
  selector: 'edit-quiz-component',
  templateUrl:  'edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent {
  title = "Modification quizz";

  public currentQuiz?:Quiz ;
  private QCService: QuizService;
  formulaire: FormGroup;
  formulaireNom: FormGroup;
  questions: Question[] | undefined = [];

  constructor(private quizService: QuizService, private route: ActivatedRoute, private formBuilder: FormBuilder, private formBuilder2: FormBuilder) {
    this.QCService=quizService;

    this.formulaire = this.formBuilder.group({
      title: '',
      good_answer: '',
      bad_answer1: '',
      bad_answer2: '',
      bad_answer3: ''
    });

    this.formulaireNom = this.formBuilder2.group({
      title_quiz: ''
    })
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.currentQuiz = quizzes[id];
    });
    this.questions=this.currentQuiz?.questions;
    this.formulaireNom.patchValue({
      title_quiz: this.currentQuiz?.name
    })
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
    alert("Question ajoutée ! Le quizz possède maintenant "+this.currentQuiz?.questions.length+" questions");
    this.formulaire.reset();

  }

  onSubmitName(){
    if(this.currentQuiz){
      this.currentQuiz.name=this.formulaireNom.value.title_quiz;
      alert("Nom de quizz modifié !");
    }
  }

  deleteQuestion(question_id: String){
    //Loop on this.questions and if the question got the same id you delete it
    if(this.questions){
      for(let i=0; i<this.questions.length; i++){
        if(this.questions[i].id==question_id){
          this.questions.splice(i,1);
          alert("Question supprimée ! ");
        }
      }
    }
  }
}
