import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { playersStatsMock } from '../mocks/playersStats.mock';
import { PlayerStatsModel, Stats } from '../models/playersStats.models';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  private userUrl = serverUrl + '/user/:userId/stats';

  private httpOptions = httpOptionsBase;
  
  constructor(private http: HttpClient) {}

  getPlayersStats(): Observable<any[]> {
    return of(playersStatsMock);
  }

  getPlayerStats(userId: number, click_mode: boolean = true): Observable<PlayerStatsModel> {
    console.log('Récupération des statistiques utilisateur...');
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
}


export { PlayerStatsModel };
