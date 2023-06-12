import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Quizz} from "../mocks/quizz.mock";
import {Quiz} from "../models/quizz.models";
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  //The list of quiz. The list is
  // retrieved from the mock.
  private themeId = 0;  //valeur de base
  private quizUrl;

  private httpOptions = httpOptionsBase;

  private quizzes$ = new BehaviorSubject<Quiz[]>([]);
  public quizzes: Quiz[] = []; // Ici on initialise la valeur avec un mock QUIZ_LIST
  // The service's constructor. Le constructeur peut prendre en paramètre les dépendances du service - comme ici,
  // HttpClient qui va permettre de récupérer les données d'un serveur
  constructor(private http: HttpClient) {
    this.quizUrl = serverUrl + '/themes/' + this.themeId + '/quizzes';
    // debugger
  }

  setThemeId(themeId: number) {
    this.themeId = themeId;
    this.quizUrl = serverUrl + '/themes/' + this.themeId + '/quizzes';
    this.retrieveQuizs();
  }


  addQuiz(nameQuiz: String){
    //this.quizzes.push(q);
    this.http.post<Quiz>(this.quizUrl, nameQuiz, this.httpOptions)//.subscribe(() => this.retrieveQuizs());
    this.printQuiz();

  }

  getQuizzes(): BehaviorSubject<Quiz[]> {
    return this.quizzes$
  }

  deleteQuiz(id: String){
    this.quizzes = this.quizzes.filter(quiz => quiz.id !== id);
  }

  printQuiz(){
    for(let i=0; i<this.quizzes.length; i++){
      console.log("Nom quiz : "+this.quizzes[i].name+" et d'id : "+this.quizzes[i].id);
    }
  }


  getQuiz(id: String): Quiz | undefined {
    let quiz = this.quizzes.find(quiz => quiz.id == id);
    console.log("quiz : " + quiz);
    return quiz;
  }

  getIndexToCreate(){
    //loop on all quizz and return the max id+1
    let maxId: string ="";
    for(let i=0; i<this.quizzes.length; i++){
      if(this.quizzes[i].id>maxId){
        maxId=this.quizzes[i].id;
      }
    }
    return maxId+1;
  }


  private retrieveQuizs() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }
}
