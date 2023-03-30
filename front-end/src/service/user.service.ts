import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {User} from "../models/user.model";
import {mockUser} from "../mocks/user.mock";
import {Quiz} from "../models/quizz.models";

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

  addUser(u: User){
    this.users.push(u);
    console.log("Un nouvel utlisateur a été ajouté ! le mock possède maintenant "+this.users.length+" utilisateurs !");
    this.printUsers();
  }

  printUsers(){
    for(let i=0; i<this.users.length; i++){
      console.log("Utilisateur de prenom : "+this.users[i].prenom);
    }
  }


}
