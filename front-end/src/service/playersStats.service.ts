// player-stats.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { playersStatsMock } from '../mocks/playersStats.mock';

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

  static getPlayerStats(id: number): Observable<any> {
    return of(playersStatsMock.find(playerStat => playerStat.id === id));
  }

  constructor() { }
}
