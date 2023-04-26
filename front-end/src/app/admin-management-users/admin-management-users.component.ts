import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-admin-management-users',
  templateUrl: './admin-management-users.component.html',
  styleUrls: ['./admin-management-users.component.scss']
})
export class AdminManagementUsersComponent {
  title = "Gestion des utilisateurs";
  users: any[] = [];
  usersList: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(){
    this.userService.getUsers().subscribe((users)=> {
      this.users = users;
    });

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].isAdmin) {
        //
      }else{
        this.usersList.push(this.users[i]);
      }
    }

  }
}
