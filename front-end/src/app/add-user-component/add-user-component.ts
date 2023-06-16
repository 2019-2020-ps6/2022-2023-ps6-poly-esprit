import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";


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


  constructor(public userService: UserService, private formBuilder: FormBuilder,private route: ActivatedRoute, private router: Router) {

    this.formulaire = this.formBuilder.group({
      nom: '',
      prenom: '',
      age: '',
      path_pp: '',
      gender: new FormControl(''),
      stade:new FormControl(''),
      male: new FormControl(false),
      female: new FormControl(false),
      stade0: new FormControl(false),
      stade1: new FormControl(false),
      stade23: new FormControl(false),
      stade4: new FormControl(false),
      administrator: new FormControl(false),
      needBigButton: new FormControl(false),
      needBigText: new FormControl(false)
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
      path_pp: userToAddBef.path_pp,
      need_big_button: false,
      need_big_text: false
    }

    //userToAdd.id=this.UService.getIndexForCreate();

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

    if(this.formulaire.value.needBigButton == true){
      userToAdd.need_big_button = true;
    }else{
      userToAdd.need_big_text = false;
    }

    if(this.formulaire.value.needBigText == true){
      userToAdd.need_big_text = true;
    }else{
      userToAdd.need_big_text = false;
    }

    if(userToAddBef.path_pp==""){
      userToAdd.path_pp="https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg"
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
}


