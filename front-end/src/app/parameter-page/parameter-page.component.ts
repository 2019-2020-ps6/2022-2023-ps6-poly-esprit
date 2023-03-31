import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ConfigurationService} from "../../service/configuration.service";

@Component({
  selector: 'app-parameter-page',
  templateUrl: './parameter-page.component.html',
  styleUrls: ['./parameter-page.component.scss']
})
export class ParameterPageComponent implements OnInit {
  title = 'Paramètres';
  texteNormal = "";
  texteGros = "";
  boutonNormal = "";
  boutonGros = "";

  isTextNormalSelected=false;
  isTextGrosSelected=false;
  isButtonNormalSelected=false;
  isButtonGrosSelected=false;
  @Input() tailleBouton?: string;

  ngOnInit() {
    this.configService.quizConfigurations$.subscribe((quizConfigurations)=>{
      this.isTextNormalSelected=quizConfigurations.isTextNormalSelected;
      this.isTextGrosSelected=quizConfigurations.isTextGrosSelected;
      this.isButtonNormalSelected=quizConfigurations.isButtonNormalSelected;
      this.isButtonGrosSelected=quizConfigurations.isButtonGrosSelected;
    })


  }

  public selectText(value: string) {
    if (value === 'normal') {
      this.isTextNormalSelected = true;
      this.isTextGrosSelected = false;
      this.configService.updateConfigration(true, false,this.isButtonNormalSelected, this.isButtonGrosSelected)
    } else {
      this.isTextNormalSelected = false;
      this.isTextGrosSelected = true;
      this.configService.updateConfigration(false, true ,this.isButtonNormalSelected, this.isButtonGrosSelected)
    }
  }

  public selectButton(value: string) {
    if (value === 'normal') {
      this.isButtonNormalSelected = true;
      this.isButtonGrosSelected = false;
      this.configService.updateConfigration(this.isTextNormalSelected, this.isTextGrosSelected,true, false);
    } else {
      this.isButtonNormalSelected = false;
      this.isButtonGrosSelected = true;
      this.configService.updateConfigration(this.isTextNormalSelected, this.isTextGrosSelected,false, true);

    }
  }

  constructor(private location: Location, private configService:ConfigurationService) {

  }

  goBack() {
    this.location.back();
  }
}
