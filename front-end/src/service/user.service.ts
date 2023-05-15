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


  createUser(): User {
    const user: User = {
      id: '123456789',
      isAdmin: true,
      nom: 'Doe',
      prenom: 'John',
      age: 30,
      sex: 'male',
      pathology: 1,
      path_pp: 'path/to/profile-picture.jpg'
    };

    return user;
  }

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
        console.log("utilisateur " + user.nom);
        return of(user);
      } else {
        return throwError(`User with ID ${Id} not found.`);
      }
  }

  /**addUserTest(){
    const userTest = this.createUser();
    this.http.post<User>(this.userUrl, userTest, this.httpOptions).subscribe(() => this.retrieveUsers());
  }*/

  addUser(u: User){
    this.users.push(u);
    console.log("Un nouvel utlisateur a été ajouté ! le mock possède maintenant "+this.users.length+" utilisateurs !");
    this.printUsers();
  }

  printUsers(){
    for(let i=0; i<this.users.length; i++){
      console.log("Utilisateur de nom : "+this.users[i].nom+" et d'id : "+this.users[i].id);
    }
  }

  deleteUser(u: User | undefined){
    if (u) {
      this.users.splice(this.users.indexOf(u), 1);
    }
  }

  deleteUserWithId(user_id: string) {
    this.users = this.users.filter(user => user.id !== user_id);
    console.log("Le mock possède maintenant:" +this.users.length +" utilisateurs");
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

  getIndexForCreate(){
    //Loop on all user, and return max+1 id
    let max=0;
    for(let i=0; i<this.users.length; i++){
      if(parseInt(this.users[i].id)>max){
        max=parseInt(this.users[i].id);
      }
    }
    return (max+1).toString();
  }



}
