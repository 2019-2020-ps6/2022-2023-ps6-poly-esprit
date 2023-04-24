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
      console.log("Utilisateur de prenom : "+this.users[i].prenom+" et d'id : "+this.users[i].id);
    }
  }

  deleteUser(u: User | undefined){
    if (u) {
      this.users.splice(this.users.indexOf(u), 1);
    }
  }

  deleteUserWithId(user_id: string){
    //delete user who got the id
    for(let i=0; i<this.users.length; i++){
      if(this.users[i].id==user_id){
        this.users.splice(i,1);
      }
    }
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

}
