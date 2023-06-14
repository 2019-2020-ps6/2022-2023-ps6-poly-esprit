import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Quizz } from '../../mocks/quizz.mock';
import {Quiz} from "../../models/quizz.models";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../models/question.models";
import {QuestionService} from "../../service/question.service";
import {BehaviorSubject} from "rxjs";
import {AnswerService} from "../../service/answer.service";


@Component({
  selector: 'edit-quiz-component',
  templateUrl:  'edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent {
  title = "Modification quizz";

  public currentQuiz?:Quiz ;
  private QUESTION_Service: QuestionService;
  formulaire: FormGroup;
  formulaireNom: FormGroup;
  public questions = new BehaviorSubject<Question[]>([])
  public id_user: string | null = "";
  public id_quiz: string | null = "";
  private idTheme = 0;


  constructor(private questionService : QuestionService, private answerService: AnswerService, private quizService: QuizService, private route: ActivatedRoute, private formBuilder: FormBuilder, private formBuilder2: FormBuilder) {
    this.QUESTION_Service=questionService;
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
    this.id_quiz = this.route.snapshot.paramMap.get('id');
    this.id_user = this.route.snapshot.paramMap.get('id_user');

    this.idTheme = Number(localStorage.getItem('idTheme'));

    this.QUESTION_Service.initialize(this.idTheme, Number(this.id_quiz));

    this.quizService.getQuizFromEditQuiz(this.idTheme, this.id_quiz).then(()=>{
      localStorage.removeItem('idTheme');

      if(this.id_quiz){
        this.currentQuiz = this.quizService.getQuiz(this.id_quiz);
      }

      if (this.currentQuiz?.questions){
        this.questions.next(this.currentQuiz?.questions);
      }

      this.formulaireNom.patchValue({
        title_quiz: this.currentQuiz?.name
      })
    });

  }

  addQuestion() : void {
    /**this.currentQuiz?.questions.push(
      {id: '1', label: 'Question', answers: [{type: 'text', value: 'Answer', isCorrect: true}]});*/

  }

  // todo : ajouter une question a la bdd
  onSubmit() {
    console.log(this.formulaire.value.title);

    console.log("TAILLE"  +this.QUESTION_Service.getSize());

    if(this.formulaire.value.title=="" || this.formulaire.value.good_answer=="" || this.formulaire.value.bad_answer1=="" || this.formulaire.value.bad_answer2=="" || this.formulaire.value.bad_answer3==""){
      alert("Veuillez remplir tous les champs");
      return;
    }
    let answers = [{type: 'text', value: this.formulaire.value.good_answer, isCorrect: true},
      {type: 'text', value: this.formulaire.value.bad_answer1, isCorrect: false},
      {type: 'text', value: this.formulaire.value.bad_answer2, isCorrect: false},
      {type: 'text', value: this.formulaire.value.bad_answer3, isCorrect: false}];

    // push the new question in bdd with question service
    this.QUESTION_Service.addQuestion(
      {id: (this.QUESTION_Service.getSize()).toString(),
        label: this.formulaire.value.title,
        path_picture: "nothing_we_need_to_change"}
    )
    alert("Question ajoutée ! Le quizz possède maintenant "+this.currentQuiz?.questions?.length+" questions");
    this.formulaire.reset();
    this.questions.next(this.QUESTION_Service.getQuestions().value);
    console.log("question dans composant : ",this.questions.value);
    console.log("question dans service : ",this.QUESTION_Service.getQuestions().value)



  }

  onSubmitName(){

    // update the name of the quiz in bdd with quiz service
    if(this.currentQuiz){
      this.quizService.updateQuiz(this.formulaireNom.value.title_quiz, this.currentQuiz.id, this.idTheme);
      //this.currentQuiz.name=this.formulaireNom.value.title_quiz;
      alert("Nom de quizz modifié !");
    }
  }

  deleteQuestion(question_id: String){
    //Loop on this.questions and if the question got the same id you delete it
    if(this.questions.value){
      for(let i=0; i<this.questions.value.length; i++){
        if(this.questions.value[i].id==question_id){
          this.questions.value.splice(i,1);
          alert("Question supprimée ! ");
        }
      }
    }
  }

}
