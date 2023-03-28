import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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

  isTextNormalSelected = true;
  isTextGrosSelected = false;
  isButtonNormalSelected = true;
  isButtonGrosSelected = false;
  @Input() tailleBouton?: string;

  ngOnInit() {
    const textMode = localStorage.getItem('textMode');
    const buttonMode = localStorage.getItem('buttonMode');

    if (textMode === 'normal') {
      this.isTextNormalSelected = true;
      this.isTextGrosSelected = false;
    } else {
      this.isTextNormalSelected = false;
      this.isTextGrosSelected = true;
    }

    if (buttonMode === 'normal') {
      this.isButtonNormalSelected = true;
      this.isButtonGrosSelected = false;
    } else {
      this.isButtonNormalSelected = false;
      this.isButtonGrosSelected = true;
    }
  }

  public selectText(value: string) {
    if (value === 'normal') {
      this.isTextNormalSelected = true;
      this.isTextGrosSelected = false;
      localStorage.setItem('textMode', 'normal');
    } else {
      this.isTextNormalSelected = false;
      this.isTextGrosSelected = true;
      localStorage.setItem('textMode', 'gros');
    }
  }

  public selectButton(value: string) {
    if (value === 'normal') {
      this.isButtonNormalSelected = true;
      this.isButtonGrosSelected = false;
      localStorage.setItem('buttonMode', 'normal');
    } else {
      this.isButtonNormalSelected = false;
      this.isButtonGrosSelected = true;
      localStorage.setItem('buttonMode', 'gros');
    }
  }

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
