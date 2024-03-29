import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

class QuizConfiguration {
  public isTextNormalSelected;
  public isTextGrosSelected;
  public isButtonNormalSelected;
  public isButtonGrosSelected;
  constructor(isTextNormalSelected: boolean, isTextGrosSelected: boolean, isButtonNormalSelected: boolean, isButtonGrosSelected: boolean) {
    this.isTextNormalSelected = isTextNormalSelected;
    this.isTextGrosSelected = isTextGrosSelected;
    this.isButtonNormalSelected = isButtonNormalSelected;
    this.isButtonGrosSelected = isButtonGrosSelected;
  }
}
class ThemeConfiguration {
  public isTextNormalSelected;
  public isTextGrosSelected;
  public isButtonNormalSelected;
  public isButtonGrosSelected;
  constructor(isTextNormalSelected: boolean, isTextGrosSelected: boolean, isButtonNormalSelected: boolean, isButtonGrosSelected: boolean) {
    this.isTextNormalSelected = isTextNormalSelected;
    this.isTextGrosSelected = isTextGrosSelected;
    this.isButtonNormalSelected = isButtonNormalSelected;
    this.isButtonGrosSelected = isButtonGrosSelected;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private quizConfigurations: QuizConfiguration= new QuizConfiguration(true, false, true, false );
  private themeConfigurations: ThemeConfiguration=new ThemeConfiguration(true, false, true, false);

  public quizConfigurations$: BehaviorSubject<QuizConfiguration>=new BehaviorSubject(this.quizConfigurations);
    constructor() { }
  public themeConfiguration$: BehaviorSubject<ThemeConfiguration>=new BehaviorSubject(this.themeConfigurations);

  updateConfigration(isTextNormal: boolean, isTextGros: boolean, isButtonNormal: boolean, isButtonGros: boolean){
      this.quizConfigurations=new QuizConfiguration(isTextNormal, isTextGros, isButtonNormal, isButtonGros);
      this.themeConfigurations=new ThemeConfiguration(isTextNormal, isTextGros, isButtonNormal, isButtonGros);
      this.quizConfigurations$.next(this.quizConfigurations);
      this.themeConfiguration$.next(this.themeConfigurations);
  }
}
