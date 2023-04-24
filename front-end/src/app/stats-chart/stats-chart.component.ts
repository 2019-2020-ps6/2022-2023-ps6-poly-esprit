import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../service/user.service";
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};


import { playersStatsMock } from '../../mocks/playersStats.mock';

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
  /*chartOptions: Partial<ApexChart> = {
    type: 'line',
    height: 500,
    zoom: {
      enabled: false
    }
  };*/

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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
  }

  ngOnInit(): void {
    if (this.click_mode){
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

    const playersStats: any[] = playersStatsMock;
    const playerNames = playersStats.map(player => `Player ${player.id}`);

    const chartCategories = playersStats[0].stats.date.map((date: any) => {
      const year = Math.floor(date / 10000);
      const month = Math.floor((date % 10000) / 100) - 1;
      const day = date % 100;
      const formattedDate = new Date(year, month, day).toLocaleDateString();
      return formattedDate;
    });

    this.chartXaxis.categories = chartCategories;

    playersStats.forEach((playerStats, index) => {
      const chartData: Partial<ChartData> = {
        name: playerNames[index],
        data: playerStats.stats.correct
      };
      this.chartData.push(chartData);
    });
  }
}
