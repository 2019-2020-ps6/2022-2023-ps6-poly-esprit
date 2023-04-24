import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../service/user.service";


@Component({
  selector: 'user-list-list-display',
  templateUrl: './user-list-display.component.html',
  styleUrls: ['./user-list-display.component.scss']
})
export class UserListDisplayComponent implements OnInit {
  users: any[] = [];
  title = 'Liste d utilisateurs';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users)=> {
      this.users = users;
    });
  }

}


