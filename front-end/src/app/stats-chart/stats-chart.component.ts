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

import { PlayerStat, PlayerStatsModel } from '../../models/playersStats.models';

@Component({
  selector: 'app-stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.scss']
})

export class StatsChartComponent implements OnInit {
  @Input() click_mode!: boolean;
  @ViewChild("chart") chart: ChartComponent | undefined

  public chartOptions: Partial<ChartOptions> | undefined;

  constructor(private userService: UserService, private playerStatsService: PlayerStatsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.userService.users$.subscribe((users) => {
      const currentUser = this.userService.getUserById(userId);
      PlayerStatsService.fetchPlayerStats(userId, this.click_mode).subscribe(
        (playerStats: PlayerStatsModel | undefined) => { // Adjusted parameter type
          if (typeof playerStats === 'undefined') {
            return;
          }
          let series: PlayerStat[];
          if (this.click_mode) {
            series = playerStats.stats.clicks;
          } else {
            series = playerStats.stats.responses;
          }
          this.chartOptions = {
            // Chart options assignment
          };
        },
        (error: any) => {
          console.log(error);
        }
      );
      /*       PlayerStatsService.getPlayerStats(userId).subscribe(
              (playerStats: PlayerStatsModel) => {
                let series: PlayerStat[];
                if (this.click_mode) {
                  series = playerStats.stats.clicks
                } else {
                  series = playerStats.stats.responses
                }
                this.chartOptions = {
                  series: series,
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
            ); */
    }
    );
  }
}