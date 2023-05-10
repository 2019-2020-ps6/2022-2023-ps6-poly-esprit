import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats-visualisation',
  templateUrl: './stats-visualisation.component.html',
  styleUrls: ['./stats-visualisation.component.scss']
})

export class StatsVisualisationComponent implements OnInit {
  isClick: boolean = true;
  isResponse: boolean = false;
  idUser: number;
  user: any;
  statsPage: number;
  choiceClics: any;
  clickItem = "click";
  reponseItem = "reponse";
  title = 'Statistiques utilisateur';

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.idUser = Number(this.route.snapshot.paramMap.get("idUser"))
    this.statsPage = 0;
  }

  ngOnInit(): void {
    const idUser = Number(this.route.snapshot.paramMap.get('idUser'));
    console.log(idUser)
    if (this.idUser != null) {
      this.userService.getUser(this.idUser).subscribe((user) => {
        this.user = user;
      });
    }
  }

  choiceClick() {
    this.isClick = true;
    this.isResponse = false;
  }

  choiceResponse() {
    this.isClick = false;
    this.isResponse = true;
  }
}