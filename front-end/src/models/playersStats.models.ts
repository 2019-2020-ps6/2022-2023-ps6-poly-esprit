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
  userId: number;
  stats: Stats;
}
