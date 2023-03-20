import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {Questions} from "../mocks/question.mock";
import {Question} from "../models/question.models";
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  //The list of quiz. The list is
  // retrieved from the mock.
  private questions$ = new Observable<any>();
  public questions: Question[] = Questions; // Ici on initialise la valeur avec un mock QUIZ_LIST
  // The service's constructor. Le constructeur peut prendre en paramètre les dépendances du service - comme ici,
  // HttpClient qui va permettre de récupérer les données d'un serveur
  constructor() {
    this.questions$ = new Observable(observer => {
      observer.next(this.questions);
      observer.complete();
    });
  }
  getQuestions(): Observable<any> {
    return this.questions$
  }



}
