import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {Quizz} from "../mocks/quizz.mock";
import {Quiz} from "../models/quizz.models";
import {ThemeService} from "./theme.service";
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  //The list of quiz. The list is
  // retrieved from the mock.
  private quizzes$ = new Observable<Quiz[]>();
  public quizzes: Quiz[] = Quizz; // Ici on initialise la valeur avec un mock QUIZ_LIST
  // The service's constructor. Le constructeur peut prendre en paramètre les dépendances du service - comme ici,
  // HttpClient qui va permettre de récupérer les données d'un serveur
  constructor() {
    this.quizzes$ = new Observable(observer => {
      observer.next(this.quizzes);
      observer.complete();
    });
  }

  addQuiz(q: Quiz){
    this.quizzes.push(q);
    // console.log("Une nouvelle questiona  été ajoutée avec comme nom :"+q.name+" et en thème: "+q.theme+"\n");
    console.log("Le mock possède maintenant:" +this.quizzes.length +"quizs");
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.quizzes$
  }

  deleteQuiz(id: String){
    //delete the quiz on the specific id
    this.quizzes = this.quizzes.filter(quiz => quiz.id !== id);
    console.log("Le mock possède maintenant:" +this.quizzes.length +"quizs");
  }

  printQuiz(){
    for(let i=0; i<this.quizzes.length; i++){
      console.log("Nom quiz : "+this.quizzes[i].name);
    }
  }



}
