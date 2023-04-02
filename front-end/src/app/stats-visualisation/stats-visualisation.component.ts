import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-stats-visualisation',
  templateUrl: './stats-visualisation.component.html',
  styleUrls: ['./stats-visualisation.component.scss']
})

export class StatsVisualisationComponent implements OnInit {
  idUser: string | null;
  user: any;
  users: any[] = [];
  title = 'Statistiques utilisateur';

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.idUser = this.route.snapshot.paramMap.get("idUser")
  }

  ngOnInit(): void {
    this.user = this.userService.getUser(this.idUser);
    this.title = `Statistiques de l'utilisateur ` + this.user.name;
  }
}
