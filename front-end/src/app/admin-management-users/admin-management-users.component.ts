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

  constructor(private userService: UserService) { }

  ngOnInit(){
    this.userService.getUsers().subscribe((users)=> {
      this.users = users;
    });
    this.users = this.users.filter((user) => user.isAdmin === false);
  }
}
