export interface PlayerStats {
  id: number;
  stats: [
    {
      type: string;
      name: string;
      data: [
        {
          x: string;
          y: number[]
        }
      ]
    }
  ]
}
