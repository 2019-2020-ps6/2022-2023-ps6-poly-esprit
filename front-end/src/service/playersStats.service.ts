// player-stats.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { playersStatsMock } from '../mocks/playersStats.mock';
import { PlayerStatsModel } from '../models/playersStats.models';

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

  static getPlayerStats(id: number): Observable<PlayerStatsModel> {
    const playerStats = playersStatsMock.find((playerStat: PlayerStatsModel) => playerStat.id === id);
    if (playerStats) {
      return of(playerStats);
    } else {
      return throwError(`Player stats not found for id ${id}`);
    }
  }
  
}
export { PlayerStatsModel };