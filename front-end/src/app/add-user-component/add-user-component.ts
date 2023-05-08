import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'add-user',
  templateUrl: 'add-user-component.html',
  styleUrls: ['./add-user-component.scss']
})
export class AddUserComponent implements OnInit {
  private UService: UserService;
  formulaire: FormGroup;
  id_user: string | null = "";

  constructor(public userService: UserService, private formBuilder: FormBuilder,private route: ActivatedRoute) {
    this.formulaire = this.formBuilder.group({
      nom: '',
      prenom: '',
      age: '',
      male: new FormControl(false),
      female: new FormControl(false),
      stade0: new FormControl(false),
      stade1: new FormControl(false),
      stade23: new FormControl(false),
      stade4: new FormControl(false),
      administrator: new FormControl(false),
    });

    this.UService=userService;
  }

  ngOnInit(): void {
    this.id_user = this.route.snapshot.paramMap.get('id_user');
  }

  onSubmit(){
    const userToAdd: User = this.formulaire.getRawValue() as User;
    userToAdd.id=(this.UService.users.length).toString();

    //Check wich FormControl is checked
    if(this.formulaire.value.stade1 == true){
      userToAdd.pathology=1;
    }else if(this.formulaire.value.stade23 == true){
      userToAdd.pathology=2;
    }else if(this.formulaire.value.stade4 == true){
      userToAdd.pathology=4;
    } else {
      userToAdd.pathology=0;
    }

    //Check the sex
    if (this.formulaire.value.male == true){
      userToAdd.sex='Male';
    }else{
      userToAdd.sex='Female';
    }

    //Check if the user is an administrator
    if(this.formulaire.value.administrator == true){
      userToAdd.isAdmin=true;
    }else{
      userToAdd.isAdmin=false;
    }


    if(userToAdd.nom == "" || userToAdd.prenom == "" || userToAdd.age <= 0){
      alert("Veuillez remplir tous les champs");
      return;
    }
    this.UService.addUser(userToAdd);
    alert("Un nouvel utilisateur a été ajouté ! ");
    this.formulaire.reset();
  }
}


