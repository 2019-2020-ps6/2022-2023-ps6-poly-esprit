/*export interface PlayerStats {
  id: number;
  stats: [
    {
      type: string;
      name: string;
      data: [
        {
          x: string;
          y: number[];
        }
      ]
    }
  ]
}*/
/*
export interface PlayerStatDataPoint {
  x: string;
  y: number[] | number;
}

export interface PlayerStat {
  type: string;
  name: string;
  data: PlayerStatDataPoint[];
}

export interface PlayerStatsModel {
  id: number;
  stats: PlayerStat[];
}

*/


export interface PlayerStatDataPoint {
  x: string;
  y: number | number[];
}

export interface PlayerStat {
  type: string;
  name: string;
  data: PlayerStatDataPoint[];
}

export interface Stats {
  clicks: PlayerStat[];
  responses: PlayerStat[];
}

export interface PlayerStatsModel {
  id: number;
  stats: Stats;
}
