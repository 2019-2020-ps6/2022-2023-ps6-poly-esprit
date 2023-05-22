import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';



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


  constructor(public userService: UserService, private formBuilder: FormBuilder,private route: ActivatedRoute, private http: HttpClient) {

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
    const userToAddBef: User = this.formulaire.getRawValue() as User;

    const userToAdd : User ={
      id: userToAddBef.id,
      isAdmin: userToAddBef.isAdmin,
      nom : userToAddBef.nom,
      prenom : userToAddBef.prenom,
      age: userToAddBef.age,
      sex: userToAddBef.sex,
      pathology: userToAddBef.pathology,
      path_pp: "to_change"
    }

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

    console.log(userToAdd);

    if(userToAdd.nom == "" || userToAdd.prenom == "" || userToAdd.age <= 0){
      alert("Veuillez remplir tous les champs");
      return;
    }

    this.UService.addUser(userToAdd);
    alert("Un nouvel utilisateur a été ajouté ! ");
    this.formulaire.reset();
  }


  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formulaire.patchValue({
        image: file
      });
    }
  }

}


