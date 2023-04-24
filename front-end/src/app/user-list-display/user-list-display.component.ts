import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../service/user.service";


@Component({
  selector: 'user-list-list-display',
  templateUrl: './user-list-display.component.html',
  styleUrls: ['./user-list-display.component.scss']
})
export class UserListDisplayComponent implements OnInit {
  users: any[] = [];
  admins: any[] = [];
  title = 'Liste d utilisateurs';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users)=> {
      this.users = users;
    });


    //Loop on users and if is admin add it in admins array and delete in users array
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].isAdmin) {
        this.admins.push(this.users[i]);
        this.users.splice(i, 1);
      }
    }


  }

}


