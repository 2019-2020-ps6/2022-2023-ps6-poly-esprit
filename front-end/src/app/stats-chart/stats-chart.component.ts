import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.scss']
})
export class StatsChartComponent implements OnInit {
  @Input() click_mode: boolean = true;
  idUser: number = 0;
  user: any;
  mode: string = "click";

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

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
  }
}
