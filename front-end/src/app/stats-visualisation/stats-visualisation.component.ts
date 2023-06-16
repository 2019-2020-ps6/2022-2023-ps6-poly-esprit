import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';
import { NgModel } from '@angular/forms';

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
  displayName = "l'utilisateur";
  statsPage: number;
  choiceClics: any;
  clickItem = "click";
  reponseItem = "reponse";
  title = 'Statistiques du patient';
  statsAvailable = false;
  displayAnalyse = false;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.userId = Number(this.route.snapshot.paramMap.get("userId"))
    this.statsPage = 0;
  }

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get("userId"));
    if (this.userId != null) {
      this.userService.users$.subscribe((u) => {
        if (u.length > 0) {
          this.userService.getUserById(userId).subscribe((user) => {
            this.user = user
            this.displayName = this.user.prenom + " " + this.user.nom
          })
        }
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
