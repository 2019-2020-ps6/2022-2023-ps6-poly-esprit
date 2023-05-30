import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { playersStatsMock } from '../mocks/playersStats.mock';
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
}
