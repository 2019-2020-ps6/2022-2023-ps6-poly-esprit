import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../service/user.service";
import { PlayerStatsService } from 'src/service/playersStats.service';
import { ActivatedRoute } from '@angular/router';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};


import { playersStatsMock } from '../../mocks/playersStats.mock';
import { map } from 'rxjs';

interface ChartData {
  name: string;
  data: number[];
}

@Component({
  selector: 'app-stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.scss']
})

export class StatsChartComponent implements OnInit {
  @Input() click_mode: boolean = true;
  @ViewChild("chart") chart: ChartComponent | undefined;
  idUser: number = 0;
  user: any;
  public mode: string = "click";
  public chartOptions: Partial<ChartOptions>;

  chartTitle: Partial<ApexTitleSubtitle> = {
    text: 'Player Stats Chart',
    align: 'center'
  };

  chartXaxis: Partial<ApexXAxis> = {
    categories: []
  };

  chartYaxis: Partial<ApexYAxis> = {
    title: {
      text: 'Stats Values'
    }
  };

  chartData: Partial<ChartData>[] = [];
  chartSeries: { name: string; data: any; }[] | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.chartOptions = {
      series: [
        {
          type: "rangeArea",
          name: "Team B Range",

          data: [
            {
              x: "Jan",
              y: [1100, 1900]
            },
            {
              x: "Feb",
              y: [1200, 1800]
            },
            {
              x: "Mar",
              y: [900, 2900]
            },
            {
              x: "Apr",
              y: [1400, 2700]
            },
            {
              x: "May",
              y: [2600, 3900]
            },
            {
              x: "Jun",
              y: [500, 1700]
            },
            {
              x: "Jul",
              y: [1900, 2300]
            },
            {
              x: "Aug",
              y: [1000, 1500]
            }
          ]
        },
        {
          type: "line",
          name: "Team B Median",
          data: [
            {
              x: "Jan",
              y: 1500
            },
            {
              x: "Feb",
              y: 1700
            },
            {
              x: "Mar",
              y: 1900
            },
            {
              x: "Apr",
              y: 2200
            },
            {
              x: "May",
              y: 3000
            },
            {
              x: "Jun",
              y: 1000
            },
            {
              x: "Jul",
              y: 2100
            },
            {
              x: "Aug",
              y: 1200
            },
            {
              x: "Sep",
              y: 1800
            },
            {
              x: "Oct",
              y: 2000
            }
          ]
        }
      ],
      chart: {
        type: "rangeArea",
        toolbar: {
          show: false
        }
      },
      title: {
        text: "" // let blank
      },
      xaxis: {
        type: "datetime",
      }
    };
    /*
    this.chartOptions = {
          name: 'Clics (%)',
          data: [
            {
              x: new Date("April 01, 2020"),
              y: [40, 80]
            },
            {
              x: new Date("April 02, 2020"),
              y: [50, 80]
            },
            {
              x: new Date("April 03, 2020"),
              y: [50, 70]
            },
            {
              x: new Date("April 04, 2020"),
              y: [80, 80]
            },
            {
              x: new Date("April 05, 2020"),
              y: [40, 80]
            },
            {
              x: new Date("April 06, 2020"),
              y: [40, 70]
            },
            {
              x: new Date("April 07, 2020"),
              y: [30, 80]
            },
            {
              x: new Date("April 08, 2020"),
              y: [40, 70]
            }
          ]}
      ],
      chart: {
        type: "rangeArea",
        toolbar: {
          show: false
        }
      },
      title: {
        text: "" // let blank
      },
      xaxis: {
        type: "datetime",
        }
    };*/
  }

  ngOnInit(): void {
    if (this.click_mode) {
      this.mode = "click"
    } else {
      this.mode = "réponses"
    }
    this.idUser = Number(this.route.snapshot.paramMap.get('idUser'));
    console.log(this.idUser);
    if (this.idUser != null) {
      this.userService.getUser(this.idUser).subscribe((user: any) => {
        this.user = user;
      });
    }

    let PlayerStats = PlayerStatsService

    PlayerStats.getPlayerStats(this.user.id).subscribe((series: any) =>
      this.chartOptions = {
        series: [series],
        chart: {
          type: "rangeArea",
          toolbar: {
            show: false
          }
        },
        title: {
          text: "" // let blank
        },
        xaxis: {
          type: "datetime",
        }
      }
    )

    console.log(this.chartOptions.series)

    const playersStats: any[] = playersStatsMock;
    const playerNames = playersStats.map(player => `Player ${player.id}`);

    /*PlayerStatsService.getPlayerStats(this.idUser).pipe(
      map((stats: { date: any[]; }) => {
        console.log("stats en dessous")
        console.log(stats);
        return stats.date.map((date: any) => {
          const year = Math.floor(date / 10000);
          const month = Math.floor((date % 10000) / 100) - 1;
          const day = date % 100;
          const formattedDate = new Date(year, month, day).toLocaleDateString();
          return formattedDate;
        })
      })
    ).subscribe(chartDates => {
      if (this.chartXaxis) {
        this.chartXaxis.type = 'datetime';
        this.chartXaxis.categories = chartDates;
      }
      PlayerStatsService.getPlayerStats(this.idUser).subscribe(stat => {
        this.chartSeries = [
          {
            name: 'Click Accuracy',
            data: stat.stats.click_accuracy
          }
        ];
      });
    });*/




    /*playersStats.forEach((playerStats, index) => {
      const chartData: Partial<ChartData> = {
        name: playerNames[index],
        data: playerStats.stats.click_accuracy
      };
      this.chartData.push(chartData);
    });*/

    /*PlayerStatsService.getPlayerStats(this.idUser).subscribe(stat => {
      this.chartSeries = [
        /*{
          name: 'Played',
          data: stat.stats.played
        },
        {
          name: 'Correct',
          data: stat.stats.correct
        },
        {
          name: 'Click Accuracy',
          data: stat.stats.click_accuracy
        }
      ];
      this.chartOptions = {
        chart: {
          type: 'rangeArea',
          toolbar: {
            show: false
          }
        },
        title: {
          text: ""// let blank
        },
        series: this.chartSeries
      };
    });*/
  };
}
