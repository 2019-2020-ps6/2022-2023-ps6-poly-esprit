import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Questions} from "../mocks/question.mock";
import {Answer, Question} from "../models/question.models";
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
    return this.questions$
  }

  getSize(): number {
    return this.questions.length;
  }

  deleteQuestion(idQuestion: number) {
    this.http.delete<Question>(this.quizUrl + '/' + idQuestion, this.httpOptions).subscribe(() => this.retrieveQuestions());
  }

  async addQuestion(label: string, path_picture: string, answers: Answer[]) {
    let question = await this.http.post<Question>(this.quizUrl, {
      label: label,
      path_picture: path_picture
    }, this.httpOptions).toPromise();

    console.log(question);
    let lastQuestion = this.questions[this.questions.length - 1];
    for (let i = 0; i < answers.length; i++) {
      await this.http.post<{type:string,value:string,isCorrect:boolean}>(this.quizUrl + '/' + question?.id + '/answers', {
        type: answers[i].type,
        value: answers[i].value,
        isCorrect: answers[i].isCorrect
      }, this.httpOptions).subscribe(async () => {
        await this.retrieveQuestions();
        console.log("Ajout de la réponse");
      });
    }
  }

  private retrieveQuestions() {
    this.http.get<Question[]>(this.quizUrl, this.httpOptions).subscribe((questions) => {
      this.questions = questions;
      this.questions$.next(this.questions);
    });
  }
}
