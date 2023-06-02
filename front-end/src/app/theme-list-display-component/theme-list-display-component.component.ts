import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../service/theme.service";
import { Themes } from "../../mocks/theme.mock";
import {Theme} from "../../models/theme.models";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";
import {UserService} from "../../service/user.service";
import {Location} from "@angular/common";
import {ConfigurationService} from "../../service/configuration.service";

@Component({
    selector: 'app-theme-list-display-component',
    templateUrl: './theme-list-display-component.component.html',
    styleUrls: ['./theme-list-display-component.component.scss']
})

export class ThemeListDisplayComponentComponent implements OnInit {
    public title:string = "Liste des thèmes";
    userId:string;
    themes: Theme[] = [];
    currentUser: User | null;
    userService: UserService;

  constructor(private themeService: ThemeService, private route: ActivatedRoute, public userS: UserService, private location: Location, private configService:ConfigurationService) {
      this.userId = String(route.snapshot.paramMap.get("idUser"));
      this.userService = userS;
      this.currentUser = this.userService.getUser(this.userId);
    }
    ngOnInit(): void {
        if(this.currentUser){
          console.log(this.currentUser);
          console.log("ATTRIBUTS" +this.currentUser.need_big_text+" "+this.currentUser.need_big_button);
          this.configService.updateConfigration(!this.currentUser.need_big_text, this.currentUser.need_big_text,!this.currentUser.need_big_button, this.currentUser.need_big_button);
        }else{
          console.log("Utilisateur non trouvé");
        }
        this.themeService.getThemes().subscribe((themes) => {
            this.themes = themes;
        })
    }

  recherche(event: any) {
    let inputValue = '';

    inputValue = event.target.value ;
    this.themeService.getThemes().subscribe((themes) => {
      this.themes = themes.filter((theme) => {
        return theme.name.toLowerCase().includes(inputValue.toLowerCase());
      });
    });
  }
}
