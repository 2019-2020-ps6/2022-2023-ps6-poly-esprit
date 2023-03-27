import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {User} from "../models/user.model";
import {mockUser} from "../mocks/user.mock";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private users$ = new Observable<any>();
  public users: User[] = mockUser;

  constructor() {
    this.users$ = new Observable(observer => {
      observer.next(this.users);
      observer.complete();
    });
  }

  getUsers(): Observable<any> {
    return this.users$
  }

}
