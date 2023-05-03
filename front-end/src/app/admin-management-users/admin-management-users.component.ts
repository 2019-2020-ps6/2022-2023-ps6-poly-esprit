import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-management-users',
  templateUrl: './admin-management-users.component.html',
  styleUrls: ['./admin-management-users.component.scss']
})
export class AdminManagementUsersComponent {
  title = "Gestion des utilisateurs";
  users: any[] = [];
  usersList: any[] = [];
  id_user: string | null ="";

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.id_user = this.route.snapshot.paramMap.get('id_user');
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
