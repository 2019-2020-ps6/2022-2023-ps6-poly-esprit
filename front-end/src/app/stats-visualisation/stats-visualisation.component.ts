import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-stats-visualisation',
  templateUrl: './stats-visualisation.component.html',
  styleUrls: ['./stats-visualisation.component.scss']
})

export class StatsVisualisationComponent implements OnInit {
  isClick: boolean = true;
  isResponse: boolean = false;
  userId: number;
  user: any;
  statsPage: number;
  choiceClics: any;
  clickItem = "click";
  reponseItem = "reponse";
  title = 'Statistiques utilisateur';

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.userId = Number(this.route.snapshot.paramMap.get("userId"))
    this.statsPage = 0;
  }

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get("userId"));
    if (this.userId != null) {
      this.userService.users$.subscribe((u) => {
        this.userService.getUserById(userId).subscribe((user) => {;
          this.user = user
          console.log("user modifié", this.user.nom, this.user.prenom)
        })
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