import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Questions} from "../mocks/question.mock";
import {Question} from "../models/question.models";
import {User} from "../models/user.model";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  //The list of quiz. The list is
  // retrieved from the mock.
  private questions$ = new BehaviorSubject<Question[]>([]);
  public questions: Question[] = []; // Ici on initialise la valeur avec un mock QUIZ_LIST
  // The service's constructor. Le constructeur peut prendre en paramètre les dépendances du service - comme ici,
  // HttpClient qui va permettre de récupérer les données d'un serveur
  private quizUrl;

  private httpOptions = httpOptionsBase;
  private themeId;
  private quizId;

  constructor(private http: HttpClient) {
    this.quizId = 0;
    this.themeId = 0;
    this.quizUrl = serverUrl + '/themes/' + this.themeId + '/quizzes/' + this.quizId + '/questions';
  }
  initialize(themeId: number, quizId: number) {
    this.themeId = themeId;
    this.quizId = quizId;
    this.quizUrl = serverUrl + '/themes/' + this.themeId + '/quizzes/' + this.quizId + '/questions';
    this.retrieveQuestions();
  }
  getQuestions(): BehaviorSubject<Question[]> {
    console.log("getQuestions");
    return this.questions$
  }

  getSize(): number {
    return this.questions.length;
  }

  deleteQuestion(u: Question | undefined){
    if (u) {
      this.questions.splice(this.questions.indexOf(u), 1);
    }
  }

  addQuestion(q:{label:string,path}){
    this.http.post<Question>(this.quizUrl, u, this.httpOptions).subscribe(() => this.retrieveQuestions());
    console.log("Question ajoutée : " + u.label);
  }

  private retrieveQuestions() {
    this.http.get<Question[]>(this.quizUrl, this.httpOptions).subscribe((questions) => {
      this.questions = questions;
      this.questions$.next(this.questions);
    });
  }
}
