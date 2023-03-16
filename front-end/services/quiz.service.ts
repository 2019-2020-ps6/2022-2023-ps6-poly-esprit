import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import {QUIZ_LIST} from "../src/mocks/quiz-list.mock";



@Injectable({
  providedIn: 'root'
})
export class QuizService {
  //The list of quiz. The list is
  // retrieved from the mock.
  public quizzes: Quiz[] = QUIZ_LIST; // Ici on initialise la valeur avec un mock QUIZ_LIST

  // The service's constructor. Le constructeur peut prendre en paramètre les dépendances du service - comme ici,
  // HttpClient qui va permettre de récupérer les données d'un serveur
  constructor() {}

  addQuiz(q: Quiz){
    this.quizzes.push(q);
    console.log("Une nouvelle questiona  été ajoutée avec comme nom :"+q.name+" et en thème: "+q.theme+"\n");
    console.log("Le mock possède maintenant:" +this.quizzes.length +"questions");
  }



}
