// player-stats.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { playersStatsMock } from '../mocks/playersStats.mock';
import { PlayerStatsModel } from '../models/playersStats.models';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  /*static getPlayerStats(arg0: number) {
    throw new Error('Method not implemented.');
  }*/

  static getPlayersStats(): Observable<any[]> {
    return of(playersStatsMock);
  }

  static getPlayerStats(userId: number, click_mode: Boolean = true): Observable<PlayerStatsModel> {
    const playerStats = playersStatsMock.find((playerStat: PlayerStatsModel) => playerStat.userId === userId);
    if (playerStats) {
      console.log(`joueur ${userId} trouvé`)
      if(click_mode) {
        return of(playerStats);
      } else {
        return of(playerStats)
      }
    } else {
      return throwError(`Statistiques utilisateur non trouvées pour l'utilisateur ${userId}`);
    }
  }
  
}
export { PlayerStatsModel };