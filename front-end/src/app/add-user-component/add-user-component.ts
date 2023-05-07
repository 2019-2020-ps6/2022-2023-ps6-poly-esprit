import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";


@Component({
  selector: 'add-user',
  templateUrl: 'add-user-component.html',
  styleUrls: ['./add-user-component.scss']
})
export class AddUserComponent implements OnInit {
  private UService: UserService;
  title = "Ajouter un utilisateur"
  imagePath: any;
  imageUrl: any;
  formulaire: FormGroup;

  constructor(public userService: UserService, private formBuilder: FormBuilder) {
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
  }

  onSubmit(){
    const userToAdd: User = this.formulaire.getRawValue() as User;
    userToAdd.id=(this.UService.users.length).toString()
    this.UService.addUser(userToAdd);
    alert("Un nouvel utilisateur a été ajouté ! ");
    this.formulaire.reset();
  }

  selectedFile(event:any){
    let reader =  new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload=(event:any)=>{
      this.imagePath=event.target.result;
    }
  }
}


