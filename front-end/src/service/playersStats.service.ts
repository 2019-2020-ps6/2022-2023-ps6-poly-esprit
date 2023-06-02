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

  endGame(userId : number, responses: number, clicks: number): Observable<PlayerStatsModel> {
    if (userId == null) {
      return throwError(`L'Id ${userId} est invalide`);
    }
    if (responses == null) {
      return throwError(`Le nombre de réponses ${responses} est invalide`);
    }
    if (clicks == null) {
      return throwError(`Le nombre de clics ${clicks} est invalide`);
    }
    
    return this.postStats(userId, responses, clicks);
  }

  postStats(userId: number, responses: number, clicks: number): Observable<PlayerStatsModel> {
    if (userId == null) {
      return throwError(`L'Id ${userId} est invalide`);
    }
    if (responses == null) {
      return throwError(`Le nombre de réponses ${responses} est invalide`);
    }
    if (clicks == null) {
      return throwError(`Le nombre de clics ${clicks} est invalide`);
    }
    
    return this.http.post<PlayerStatsModel>(this.userUrl + userId, {"responses":responses, "clicks":clicks})
      .pipe(
        catchError((error: any) => {
          console.log('Erreur lors de l\'envoie des statistiques de la partie', error);
          return throwError(`Erreur lors de l\'envoie des statistiques de la partie pour l'utilisateur ${userId} et les statistiques ${responses} et ${clicks}`);
        })
      );
  }
}
