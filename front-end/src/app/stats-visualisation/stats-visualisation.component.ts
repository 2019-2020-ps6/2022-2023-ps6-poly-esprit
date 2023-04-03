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
  idUser: number;
  user: any;
  users: any[] = [];
  title = 'Statistiques utilisateur';

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.idUser = Number(this.route.snapshot.paramMap.get("idUser"))
  }

  ngOnInit(): void {
    const idUser = Number(this.route.snapshot.paramMap.get('idUser'));
    console.log(idUser)
    if (this.idUser != null) {
      this.userService.getUser(this.idUser).subscribe((user) => {
        this.user = user;
      });
    }
    this.title = `Statistiques de l'utilisateur ` + this.user.nom;
  }
}