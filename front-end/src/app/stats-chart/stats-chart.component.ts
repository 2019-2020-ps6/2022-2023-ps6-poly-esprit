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
import * as ApexCharts from 'apexcharts';

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
  public chartOptions!: Partial<ChartOptions>;

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
    var options = {
      series: [
      {
        type: 'rangeArea',
        name: 'Team B Range',
    
        data: [
          {
            x: 'Jan',
            y: [1100, 1900]
          },
          {
            x: 'Feb',
            y: [1200, 1800]
          },
          {
            x: 'Mar',
            y: [900, 2900]
          },
          {
            x: 'Apr',
            y: [1400, 2700]
          },
          {
            x: 'May',
            y: [2600, 3900]
          },
          {
            x: 'Jun',
            y: [500, 1700]
          },
          {
            x: 'Jul',
            y: [1900, 2300]
          },
          {
            x: 'Aug',
            y: [1000, 1500]
          }
        ]
      },
    
      {
        type: 'rangeArea',
        name: 'Team A Range',
        data: [
          {
            x: 'Jan',
            y: [3100, 3400]
          },
          {
            x: 'Feb',
            y: [4200, 5200]
          },
          {
            x: 'Mar',
            y: [3900, 4900]
          },
          {
            x: 'Apr',
            y: [3400, 3900]
          },
          {
            x: 'May',
            y: [5100, 5900]
          },
          {
            x: 'Jun',
            y: [5400, 6700]
          },
          {
            x: 'Jul',
            y: [4300, 4600]
          },
          {
            x: 'Aug',
            y: [2100, 2900]
          }
        ]
      },
    
      {
        type: 'line',
        name: 'Team B Median',
        data: [
          {
            x: 'Jan',
            y: 1500
          },
          {
            x: 'Feb',
            y: 1700
          },
          {
            x: 'Mar',
            y: 1900
          },
          {
            x: 'Apr',
            y: 2200
          },
          {
            x: 'May',
            y: 3000
          },
          {
            x: 'Jun',
            y: 1000
          },
          {
            x: 'Jul',
            y: 2100
          },
          {
            x: 'Aug',
            y: 1200
          },
          {
            x: 'Sep',
            y: 1800
          },
          {
            x: 'Oct',
            y: 2000
          }
        ]
      },
      {
        type: 'line',
        name: 'Team A Median',
        data: [
          {
            x: 'Jan',
            y: 3300
          },
          {
            x: 'Feb',
            y: 4900
          },
          {
            x: 'Mar',
            y: 4300
          },
          {
            x: 'Apr',
            y: 3700
          },
          {
            x: 'May',
            y: 5500
          },
          {
            x: 'Jun',
            y: 5900
          },
          {
            x: 'Jul',
            y: 4500
          },
          {
            x: 'Aug',
            y: 2400
          },
          {
            x: 'Sep',
            y: 2100
          },
          {
            x: 'Oct',
            y: 1500
          }
        ]
      }
    ],
      chart: {
      height: 350,
      type: 'rangeArea',
      animations: {
        speed: 500
      }
    },
    colors: ['#d4526e', '#33b2df', '#d4526e', '#33b2df'],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: [0.24, 0.24, 1, 1]
    },
    forecastDataPoints: {
      count: 2
    },
    stroke: {
      curve: 'straight',
      width: [0, 0, 2, 2]
    },
    legend: {
      show: true,
      customLegendItems: ['Team B', 'Team A'],
      inverseOrder: true
    },
    title: {
      text: 'Range Area with Forecast Line (Combo)'
    },
    markers: {
      hover: {
        sizeOffset: 5
      }
    }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    /*this.chartOptions = {
      series: [
        {
          type: "rangeArea",
          name: "Team B Range",

          data: [
            {
              x: new Date("01/05/2023"),
              y: [1100, 1900]
            },
            {
              x: new Date("02/05/2023"),
              y: [1200, 1800]
            },
            {
              x: new Date("03/05/2023"),
              y: [900, 2900]
            },
            {
              x: new Date("04/05/2023"),
              y: [1400, 2700]
            },
            {
              x: new Date("05/05/2023"),
              y: [2600, 3900]
            },
            {
              x: new Date("06/05/2023"),
              y: [500, 1700]
            },
            {
              x: new Date("07/05/2023"),
              y: [1900, 2300]
            },
            {
              x: new Date("08/05/2023"),
              y: [1000, 1500]
            }
          ]
        },
        {
          type: "line",
          name: "Team B Median",
          data: [
            {
              x: new Date("01/05/2023"),
              y: 1500
            },
            {
              x: new Date("02/05/2023"),
              y: 1700
            },
            {
              x: new Date("03/05/2023"),
              y: 1900
            },
            {
              x: new Date("04/05/2023"),
              y: 2200
            },
            {
              x: new Date("05/05/2023"),
              y: 3000
            },
            {
              x: new Date("06/05/2023"),
              y: 1000
            },
            {
              x: new Date("07/05/2023"),
              y: 2100
            },
            {
              x: new Date("08/05/2023"),
              y: 1200
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
        type: 'datetime',
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
      console.log(series)
    )

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
