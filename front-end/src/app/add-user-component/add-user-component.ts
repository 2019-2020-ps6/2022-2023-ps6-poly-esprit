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
    userToAdd.id=this.UService.getIndexForCreate();

    //Check wich FormControl is checked
    const pathologyControl = this.formulaire.get('stade');
    if(pathologyControl){
      const pathologyValue = pathologyControl.value;
      if (pathologyValue === '1'){
        userToAdd.pathology=1;
      }else if(pathologyValue === '23'){
        userToAdd.pathology=2;
      }else if(pathologyValue === '4'){
        userToAdd.pathology=4;
      } else {
        userToAdd.pathology=0;
      }
    }

    //Check the sex
    const genderControl = this.formulaire.get('gender');
    if(genderControl){
      const genderValue = genderControl.value;
      if (genderValue === 'male'){
        userToAdd.sex='Male';
      }else{
        userToAdd.sex='Female';
      }
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


