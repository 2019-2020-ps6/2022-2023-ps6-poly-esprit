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
  title= "Ajout d'un utilisateur";


  constructor(public userService: UserService, private formBuilder: FormBuilder,private route: ActivatedRoute) {

    this.formulaire = this.formBuilder.group({
      nom: '',
      prenom: '',
      age: '',
      gender: new FormControl(''),
      stade:new FormControl(''),
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
    if(userToAdd.nom == "" || userToAdd.prenom == "" || userToAdd.age <= 0 || userToAdd.pathology == undefined){
      alert("Veuillez remplir tous les champs");
      return;
    }
    this.UService.addUser(userToAdd);
    alert("Un nouvel utilisateur a été ajouté ! ");
    this.formulaire.reset();
  }
}


