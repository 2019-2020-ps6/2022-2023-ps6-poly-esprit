import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../service/user.service";
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
      series: [{
          name: 'Sales',
          data: [
            {
              x: new Date(1538778600000),
              y: [6629, 8695]
            },
            {
              x: new Date(1538782200000),
              y: [7129, 8825]
            },
            {
              x: new Date(1538785800000),
              y: [7529, 9625]
            },
            {
              x: new Date(1538789400000),
              y: [6629, 8695]
            },
            {
              x: new Date(1538793000000),
              y: [7529, 9625]
            },
            {
              x: new Date(1538796600000),
              y: [7129, 8825]
            },
            {
              x: new Date(1538800200000),
              y: [7529, 9625]
            },
            {
              x: new Date(1538803800000),
              y: [6629, 8695]
            }
          ]}
      ],
      chart: {
        height: 350,
        type: "rangeArea"
      },
      title: {
        text: "" // let blank
      },
      xaxis: {
        type: "datetime",
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

    if (this.chartXaxis) {
      this.chartXaxis.categories = chartCategories;
    }
    

    playersStats.forEach((playerStats, index) => {
      const chartData: Partial<ChartData> = {
        name: playerNames[index],
        data: playerStats.stats.correct
      };
      this.chartData.push(chartData);
    });
  }
}
