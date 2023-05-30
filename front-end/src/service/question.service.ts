import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {Questions} from "../mocks/question.mock";
import {Question} from "../models/question.models";
import {User} from "../models/user.model";
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  //The list of quiz. The list is
  // retrieved from the mock.
  private questions$ = new Observable<Question[]>();
  public questions: Question[] = Questions; // Ici on initialise la valeur avec un mock QUIZ_LIST
  // The service's constructor. Le constructeur peut prendre en paramètre les dépendances du service - comme ici,
  // HttpClient qui va permettre de récupérer les données d'un serveur
  constructor() {
    this.questions$ = new Observable(observer => {
      observer.next(this.questions);
      observer.complete();
    });
  }
  getQuestions(): Observable<Question[]> {
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

  addQuestion(u: Question){
    this.questions.push(u);

  }


}
