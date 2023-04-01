import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  private UService: UserService;
  public currentUser?:User;
  formulaire: FormGroup;

  constructor(public userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.UService.getUsers().subscribe((users) => {
      this.currentUser = users[id];
    });
    this.updateForm();
  }

  updateForm(){
    this.formulaire.patchValue({
      nom: this.currentUser?.nom,
      prenom: this.currentUser?.prenom,
      age: this.currentUser?.age,
    });

    if(this.currentUser?.sex==='Male'){
      this.formulaire.patchValue({
        male: true,
      });
    }else{
      this.formulaire.patchValue({
        female: true,
      });
    }

    if(this.currentUser?.pathology===0){
      this.formulaire.patchValue({
        stade0: true,
      });
    }else if(this.currentUser?.pathology===1){
      this.formulaire.patchValue({
        stade1: true,
      });
    }else if(this.currentUser?.pathology===4){
      this.formulaire.patchValue({
        stade4: true,
      });
    }else{
      this.formulaire.patchValue({
        stade23: true,
      });
    }

  }


  onSubmit(){
    const userToAdd: User = this.formulaire.getRawValue() as User;
    userToAdd.id=<string>this.currentUser?.id;
    this.UService.deleteUser(this.currentUser);
    this.UService.addUser(userToAdd);
    alert("Utilisateur mis à jour ! ");
  }
}
