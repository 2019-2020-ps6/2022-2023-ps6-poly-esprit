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
  private questionIndex = 0;


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

  // todo : ajouter une question a la bdd
  onSubmit() {
    if(this.formulaire.value.title=="" || this.formulaire.value.good_answer=="" || this.formulaire.value.bad_answer1=="" || this.formulaire.value.bad_answer2=="" || this.formulaire.value.bad_answer3==""){
      alert("Veuillez remplir tous les champs");
      return;
    }
    let answers = [
      {type: 'text', value: this.formulaire.value.good_answer, isCorrect: true},
      {type: 'text', value: this.formulaire.value.bad_answer1, isCorrect: false},
      {type: 'text', value: this.formulaire.value.bad_answer2, isCorrect: false},
      {type: 'text', value: this.formulaire.value.bad_answer3, isCorrect: false}
    ];

    console.log(this.QUESTION_Service.getSize());
    // push the new question in bdd with question service
    this.QUESTION_Service.addQuestion(this.formulaire.value.title, "nothing_we_need_to_change", answers).then(r =>{
      alert("Question ajoutée ! Le quizz possède maintenant "+this.currentQuiz?.questions?.length+" questions");
      this.formulaire.reset();
      this.questions.next(this.QUESTION_Service.getQuestions().value);
      window.location.reload();
    });
    //this.QUESTION_Service.initialize(this.idTheme, Number(this.id_quiz));
    //console.log(this.QUESTION_Service.getSize());
    /*this.questionIndex = Number(this.QUESTION_Service.getSize()-1);
    this.answerService.initialize(this.idTheme, Number(this.id_quiz), Number(this.QUESTION_Service.getQuestions().value[this.QUESTION_Service.getSize()-1].id));
    for(let i=0; i<answers.length; i++){
      this.answerService.addAnswer(answers[i].type,answers[i].value, answers[i].isCorrect);
    }*/



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
    this.QUESTION_Service.deleteQuestion(Number(question_id));
    window.location.reload();
    alert("Question supprimée ! ");
  }

  sendIdForComponent() {
    localStorage.setItem('idTheme', String(this.idTheme));
  }
}
