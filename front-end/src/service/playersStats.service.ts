// player-stats.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { playersStatsMock } from '../mocks/playersStats.mock';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {

  constructor() { }

  getPlayerStats(): Observable<any[]> {
    return of(playersStatsMock);
  }

  getPlayerStat(id: number): Observable<any> {
    return of(playersStatsMock.find(playerStat => playerStat.id === id));
  }
}
