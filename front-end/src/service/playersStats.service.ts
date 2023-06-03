import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { PlayerStatsModel } from '../models/playersStats.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})

export class PlayerStatsService {
  private userUrl = serverUrl + '/stats?userId=';
  private endgameUrl = serverUrl + '/stats/endgame?userId=';

  constructor(private http: HttpClient) {}

  getPlayerStats(userId: number, click_mode: boolean | null): Observable<PlayerStatsModel> {
    if (userId == null) {
      return throwError(`L'Id ${userId} est invalide`);
    }
    if (click_mode == null) {
      return throwError(`Le mode ${click_mode} est invalide`);
    }
    
    return this.fetchPlayerStats(userId, click_mode);
  }

  fetchPlayerStats(userId: number, click_mode: boolean): Observable<PlayerStatsModel> {    
    return this.http.get<PlayerStatsModel>(this.userUrl + userId)
      .pipe(
        catchError((error: any) => {
          console.log('Erreur lors de la récupération des statistiques utilisateur', error);
          return throwError(`Erreur lors de la récupération des statistiques utilisateur pour l'utilisateur ${userId}`);
        })
      );
  }

  endGame(userId : number, responses: number, clicks: number): void | Observable<never> {
    console.log("endgame")
    if (userId == null) {
      return throwError(`L'Id ${userId} est invalide`);
    }
    if (responses == null) {
      return throwError(`Le nombre de réponses ${responses} est invalide`);
    }
    if (clicks == null) {
      return throwError(`Le nombre de clics ${clicks} est invalide`);
    }
    this.postStats(userId, responses, clicks);
    return;
  }

  postStats(userId: number, responses: number, clicks: number): void {
    console.log("poststats")
    const data = JSON.stringify({"responses":responses, "clicks":clicks});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let a = this.http.post(this.endgameUrl + userId,  data, httpOptions).toPromise();
    console.log(a.then(() => console.log("ok")));
  }
}
