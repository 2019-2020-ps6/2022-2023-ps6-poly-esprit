import { Injectable, Optional } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { playersStatsMock } from '../mocks/playersStats.mock';
import { PlayerStatsModel, Stats } from '../models/playersStats.models';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  static http: any;
  static getPlayerStats(userId: number, click_mode: boolean | null) {
    if (userId == null) {
      return throwError(`L'Id ${userId} est invalide`);
    }
    if (click_mode == null) {
      return throwError(`Le mode ${click_mode} est invalide`);
    }
    return this.fetchPlayerStats(userId, click_mode);
    if (click_mode) {
      return of(playersStatsMock.find((playerStat: PlayerStatsModel) => playerStat.userId === userId));
    } else {
      return of(playersStatsMock.find((playerStat: PlayerStatsModel) => playerStat.userId === userId));
    }
  }
  static userUrl = serverUrl + '/user/:userId/stats';

  private httpOptions = httpOptionsBase;
  
  constructor(private http: HttpClient) {}

  getPlayersStats(): Observable<any[]> {
    return of(playersStatsMock);
  }

  static fetchPlayerStats(userId: number, click_mode: boolean | undefined): Observable<PlayerStatsModel> {
    console.log('Récupération des statistiques utilisateur depuis l\'URL ', this.userUrl.replace(':userId', String(userId)));
    this.http.request('GET', this.userUrl.replace(':userId', String(userId)), this.httpOptions).subscribe((userStats: any) => {
      console.log("userStats : ", userStats);
    });
    console.log("fin de la récupération des statistiques utilisateur");
    this.http.get(this.userUrl.replace(':userId', String(userId)), this.httpOptions).subscribe((userStats: any) => {
      console.log("userStats : ", userStats);
    });
    console.log("fin de la récupération des statistiques utilisateur");
    const playerStats = playersStatsMock.find((playerStat: PlayerStatsModel) => playerStat.userId === userId);
    if (playerStats) {
      if (click_mode) {
        return of(playerStats);
      } else {
        return of(playerStats);
      }
    } else {
      return throwError(`Statistiques utilisateur non trouvées pour l'utilisateur ${userId}`);
    }
  }
  static httpOptions(arg0: any, httpOptions: any) {
    throw new Error('Method not implemented.');
  }
}


export { PlayerStatsModel };
