import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Location} from "@angular/common";
import {ConfigurationService} from "../../service/configuration.service";


@Component({
  selector: 'user-list-list-display',
  templateUrl: './user-list-display.component.html',
  styleUrls: ['./user-list-display.component.scss']
})
export class UserListDisplayComponent implements OnInit {
  users: any[] = [];

  usersList: any[] = [];
  adminsList: any[] = [];

  title = 'Liste d\'utilisateurs';

  constructor(private userService: UserService, private location: Location, private configService:ConfigurationService) {
    this.configService.updateConfigration(true, false,true, false);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users);

      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].path_pp == "to_change") {
          this.users[i].path_pp = "https://i.pinimg.com/originals/68/f2/ed/68f2ed76c22f4fa2f1d7b34737ce8e12.png";
        }
        if (this.users[i].isAdmin) {
          this.adminsList.push(this.users[i]);
        } else {
          this.usersList.push(this.users[i]);
        }
      }
    });
  }
}


