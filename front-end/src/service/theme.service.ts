import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import { Theme } from "../models/theme.models";
import { Themes } from "../mocks/theme.mock";
import { Quizz } from "../mocks/quizz.mock";
import { Quiz } from "../models/quizz.models";

@Injectable({
    providedIn: 'root'
})

export class ThemeService {
    private themes$ = new Observable<Theme[]>()
  // @ts-ignore
    private themes: Theme[] = Themes;

    constructor() {
        this.themes$ = new Observable(observer => {
            observer.next(this.themes);
            observer.complete();
        });
    }

    getThemes(): Observable<Theme[]> {  //returns all themes
        return this.themes$;
    }

    getTheme(id: number): Observable<Theme> {
      const theme = this.themes.find(t => t.id == id);
      console.log("theme " + theme);
      if (theme) {
        return of(theme);
      } else {
        return throwError(`Theme with ID ${id} not found.`);
      }
    }

    addTheme(name: String): void {

    }

  deleteQuiz(id_quiz: string) {
    for(let i =0; i < this.themes.length; i++){
      let theme = this.themes[i];
      let quizz = theme.quizzes;
      if(quizz!=null){
        for(let j =0; j < quizz.length; j++){
          if(quizz[j].id == id_quiz){
            quizz.splice(j,1);
            break;
          }
        }
      }
    }
  }

  addQuiz(quizToCreate: Quiz, theme: Theme) {
    //Loop through themes, if theme exists, add quiz to theme, else create theme and add quiz to theme
    let themeExists = false;
    for(let i =0; i < this.themes.length; i++){
      let themeToCheck = this.themes[i];
      if(themeToCheck.name == theme.name){
        themeExists = true;
        if (themeToCheck.quizzes) {
          themeToCheck.quizzes.push(quizToCreate);
        }
        break;
      }
    }
    if(!themeExists){
      theme.quizzes = [];
      theme.quizzes.push(quizToCreate);
      this.themes.push(theme);
    }
  }

  getIndexToCreate(){
      return this.themes.length;
  }
}
