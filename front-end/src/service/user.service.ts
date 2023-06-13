import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import {User} from "../models/user.model";
import {mockUser} from "../mocks/user.mock";
import {Quiz} from "../models/quizz.models";
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  public users: User[] = [];

  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);


  private userUrl = serverUrl + '/users';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.http.get<User[]>(this.userUrl).subscribe((userList) => {
      this.users = userList;
      this.users$.next(this.users);
    });
  }

  getUsers(): BehaviorSubject<User[]> {
    return this.users$
  }

  getUserById(Id : number | null) {
    if(Id == null) {
      return throwError(`L'Id ${Id} est invalide`)
    }
    const user = this.users.find(t => t.id == String(Id));
      if (user) {
        return of(user);
      } else {
        return throwError(`User with ID ${Id} not found.`);
      }
  }

  addUser(u: User){
    this.http.post<User>(this.userUrl, u, this.httpOptions).subscribe(() => this.retrieveUsers());
    this.printUsers();
  }

  printUsers(){
    for(let i=0; i<this.users.length; i++){
      console.log("Utilisateur de nom : "+this.users[i].nom+" et d'id : "+this.users[i].id);
    }
  }
  deleteUser(id: string){
    const urlWithId = this.userUrl + '/' + id;
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.retrieveUsers());
  }
  deleteUserWithId(user_id: string) {
    this.users = this.users.filter(user => user.id !== user_id);
  }
  isAdmin(user_id: string){
    if(user_id){
      //Check if the user is an admin
      for(let i=0; i<this.users.length; i++){
        if(this.users[i].id==user_id){
          return this.users[i].isAdmin;
        }
      }
    }
    return false;
  }

  getUser(id: String){
    for(let i=0; i<this.users.length; i++){
      if(this.users[i].id==id){
        return this.users[i];
      }
    }
    return null;
  }

}
