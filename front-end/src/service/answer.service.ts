import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Questions} from "../mocks/question.mock";
import {Answer, Question} from "../models/question.models";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  //The list of quiz. The list is
  // retrieved from the mock.
  private answers$ = new BehaviorSubject<Answer[]>([]);
  public answers: Answer[] = []; // Ici on initialise la valeur avec un mock QUIZ_LIST
  // The service's constructor. Le constructeur peut prendre en paramètre les dépendances du service - comme ici,
  // HttpClient qui va permettre de récupérer les données d'un serveur
  private answerUrl;

  private httpOptions = httpOptionsBase;
  private themeId;
  private quizId;
  private questionId;

  constructor(private http: HttpClient) {
    this.quizId = 0;
    this.themeId = 0;
    this.questionId = 0;
    this.answerUrl = serverUrl + '/themes/' + this.themeId + '/quizzes/' + this.quizId + '/questions' + this.questionId + '/answers';
  }
  initialize(themeId: number, quizId: number, questionId: number) {
    this.themeId = themeId;
    this.quizId = quizId;
    this.questionId = questionId;
    this.answerUrl = serverUrl + '/themes/' + this.themeId + '/quizzes/' + this.quizId + '/questions' + this.questionId + '/answers';
    this.retrieveAnswers();
  }
  getAnswer(): BehaviorSubject<Answer[]> {
    console.log("getQuestions");
    return this.answers$;
  }

  getSize(): number {
    return this.answers.length;
  }

  deleteQuestion(u: Question | undefined){
    if (u) {
      this.answers.splice(this.answers.indexOf(u), 1);
    }
  }

  addQuestion(u: Question){
    this.http.post<Question>(this.answerUrl, u, this.httpOptions).subscribe(() => this.retrieveAnswers());
    console.log("Question ajoutée : " + u.label);
  }

  private retrieveAnswers() {
    this.http.get<Answer[]>(this.answerUrl, this.httpOptions).subscribe((answers) => {
      this.answers = answers;
      this.answers$.next(this.answers);
    });
  }
}
