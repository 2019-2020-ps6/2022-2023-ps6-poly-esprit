/*import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

export class StatsChartComponent implements OnInit{
  @Input() click_mode: boolean = true;
  @ViewChild("chart") chart: ChartComponent | undefined;

  private UService: UserService;

  constructor(public userService: UserService, private route: ActivatedRoute) {
    this.UService=userService;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.UService.getUser(id).subscribe((user) => {
      const currentUser = user;
    });
  }
  public mode: string = "click";
  public chartOptions!: Partial<ChartOptions>;
}*/
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../service/user.service";
import { PlayerStatsService } from '../../service/playersStats.service';
import { ActivatedRoute } from '@angular/router';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexMarkers,
  ApexFill,
  ApexForecastDataPoints,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  colors: string[];
  fill: ApexFill;
  forecastDataPoints: ApexForecastDataPoints;
  legend: ApexLegend;
};

import { PlayerStat, PlayerStatDataPoint, PlayerStatsModel } from '../../models/playersStats.models';
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

  public mode: string = "click";
  public chartOptions: Partial<ChartOptions> | undefined;

  constructor(private userService: UserService, private playerStatsService: PlayerStatsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe((user) => {
      const currentUser = user;
      PlayerStatsService.getPlayerStats(id).subscribe(
        (playerStats: PlayerStatsModel) => {
          console.log(playerStats.stats)
          this.chartOptions = {
            series: playerStats.stats,
            chart: {
              height: 350,
              type: "rangeArea",
              animations: {
                speed: 500
              }
            },
            colors: ["#d4526e", "#33b2df", "#d4526e", "#33b2df"],
            dataLabels: {
              enabled: false
            },
            fill: {
              opacity: [0.24, 0.24, 1, 1]
            },
            forecastDataPoints: {
              count: 2,
              dashArray: 4
            },
            stroke: {
              curve: "straight",
              width: [0, 0, 2, 2]
            },
            legend: {
              show: false,
              customLegendItems: ["Moyenne", "Min-Max"],
              inverseOrder: true
            },
            title: {
              text: ""
            },
            markers: {
              hover: {
                sizeOffset: 5
              }
            }
          }
          /*
          const data: ChartData[] = playerStats.stats.map((stat: PlayerStat) => {
            const rangeAreaStat = stat.data.find((d: PlayerStatDataPoint) => d.x === 'rangeArea');
            if (rangeAreaStat) {
              console.log(rangeAreaStat);
              return {
                name: `${stat.name} ${currentUser.nom}`,
                data: rangeAreaStat.y instanceof Array ? rangeAreaStat.y : [rangeAreaStat.y]
              } as ChartData;
            } else {
              this.chartOptions = {
                series: [
                  {
                    type: "line",
                    name: "Moyenne",
                    data: stat.data
                  },
                {
                  type: "rangeArea",
                  name: "Min-Max",
                  data: stat.data
                }
                ],
                chart: {
                  height: 350,
                  type: "rangeArea",
                  animations: {
                    speed: 500
                  }
                },
                colors: ["#d4526e", "#33b2df", "#d4526e", "#33b2df"],
                dataLabels: {
                  enabled: false
                },
                fill: {
                  opacity: [0.24, 0.24, 1, 1]
                },
                forecastDataPoints: {
                  count: 2,
                  dashArray: 4
                },
                stroke: {
                  curve: "straight",
                  width: [0, 0, 2, 2]
                },
                legend: {
                  show: true,
                  customLegendItems: ["Team B", "Team A"],
                  inverseOrder: true
                },
                title: {
                  text: "Range Area with Forecast Line (Combo)"
                },
                markers: {
                  hover: {
                    sizeOffset: 5
                  }
                }
              };
              console.log("data !!!")
              console.log(stat.data);
              return {
                name: '',
                data: []
              } as ChartData;
            }
          });

          /*this.chartOptions = {
            series: data.map((d) => ({ name: d.name, data: d.data })),
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              },
            },
            title: {
              text: `Player Stats for ${currentUser['nom']}`,
              align: 'center',
              style: {
                fontSize: '16px',
                fontWeight: 'normal',
                color: '#666'
              }
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              title: {
                text: 'Month'
              }
            },
            yaxis: {
              title: {
                text: 'Average Stats'
              }
            }
          };*/
        },

        (error: any) => {
          console.log(error);
        }
      );
    });
  }
}
