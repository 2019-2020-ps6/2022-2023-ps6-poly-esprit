import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-parameter-page',
  templateUrl: './parameter-page.component.html',
  styleUrls: ['./parameter-page.component.scss']
})
export class ParameterPageComponent {
  title = 'Paramètres';
  texteNormal = "";
  texteGros = "";
  boutonNormal = "";
  boutonGros = "";

  isTextNormalSelected = true;
  isTextGrosSelected = false;
  isButtonNormalSelected = true;
  isButtonGrosSelected = false;

  public selectText(value: string) {
    if (value === 'normal') {
      this.isTextNormalSelected = true;
      this.isTextGrosSelected = false;
    } else {
      this.isTextNormalSelected = false;
      this.isTextGrosSelected = true;
    }
  }

  public selectButton(value: string) {
    if (value === 'normal') {
      this.isButtonNormalSelected = true;
      this.isButtonGrosSelected = false;
    } else {
      this.isButtonNormalSelected = false;
      this.isButtonGrosSelected = true;
    }
  }

  constructor(private location: Location) {
  }

  goBack() {
    this.location.back();
  }
}
