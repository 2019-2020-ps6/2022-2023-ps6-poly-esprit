import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  private UService: UserService;
  public currentUser?:User;
  formulaire: FormGroup;
  imagePath: any;
  imageUrl: any;
  id_user: string | null ="";
  title = "Modification d'un utilisateur";

  constructor(public userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formulaire = this.formBuilder.group({
      nom: '',
      prenom: '',
      age: '',
      gender: '',
      stade: '',
      administrator: '',
      needBigButton: '',
      needBigText: '',
      path_pp: ''
    });

    this.UService=userService;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.id_user = this.route.snapshot.paramMap.get('id_user');
    console.log(id)

    this.UService.getUsers().subscribe((users) => {
      if(id){
        let test = this.UService.getUser(id);
        if(test) this.currentUser=test;
      }
    });

    this.imagePath=this.currentUser?.path_pp;
    this.updateForm();
  }

  updateForm(){
    this.formulaire.patchValue({
      nom: this.currentUser?.nom,
      prenom: this.currentUser?.prenom,
      age: this.currentUser?.age,
      path_pp: this.currentUser?.path_pp,
    });

    if(this.currentUser?.sex==='Male'){
      this.formulaire.patchValue({
        gender: 'male',
      });
    }else{
      this.formulaire.patchValue({
        gender: 'female',
      });
    }

    if(this.currentUser?.pathology===0){
      this.formulaire.patchValue({
        stade: '0',
      });
    }else if(this.currentUser?.pathology===1){
      this.formulaire.patchValue({
        stade: '1',
      });
    }else if(this.currentUser?.pathology===4){
      this.formulaire.patchValue({
        stade: '4',
      });
    }else{
      this.formulaire.patchValue({
        stade: '23',
      });
    }

    if(this.currentUser?.need_big_button){
      this.formulaire.patchValue({
        needBigButton: true,
      })
    }

    if(this.currentUser?.need_big_text){
      this.formulaire.patchValue({
        needBigText: true,
      })
    }

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

    userToAdd.id=<string>this.currentUser?.id;

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

    //Test

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


    if(this.currentUser){
      this.UService.deleteUser(this.currentUser.id);
      this.UService.addUser(userToAdd);
      alert("Utilisateur mis à jour ! ");
    }
  }

  selectedFile(event:any){
    let reader =  new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload=(event:any)=>{
      this.imagePath=event.target.result;
    }
  }
}
