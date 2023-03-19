import { Injectable } from '@angular/core';
import { Quiz } from "../models/quizz.models";
import { Quizz } from '../mocks/quizz.mock';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GameServiceService {
  private quizList: Quiz[] = Quizz;
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizList);
  constructor(private http: HttpClient, public quizService: GameServiceService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

}
