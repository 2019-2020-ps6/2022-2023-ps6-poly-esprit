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
  @ViewChild("chart") chart: ChartComponent | undefined

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
              },
              toolbar: {
                show: false
              }
            },
            colors: ["#d4526e", "#33b2df"],
            dataLabels: {
              enabled: false
            },
            fill: {
              type: 'solid',
              opacity: [0.24, 1]
            },
            stroke: {
              curve: "smooth",
              width: [0, 3]
            },
            legend: {
              show: true,
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
        },

        (error: any) => {
          console.log(error);
        }
      );
    });
  }
}
