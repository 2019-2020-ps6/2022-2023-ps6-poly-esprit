import {Component, OnInit} from '@angular/core';
import {Stats} from "../../models/stats.model";
import {STATS} from "../../mocks/stats.mock";

@Component({
  selector: 'app-stats-page-component',
  templateUrl: './stats-page-component.component.html',
  styleUrls: ['./stats-page-component.component.scss']
})
export class StatsPageComponentComponent implements OnInit{
  // @ts-ignore
  stats: Stats[] = STATS;




  ngOnInit() {

  }
}
