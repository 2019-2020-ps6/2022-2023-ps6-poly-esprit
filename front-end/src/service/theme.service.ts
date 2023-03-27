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
    private themes$ = new Observable<any>()
  // @ts-ignore
    private themes: Theme[] = Themes;

    constructor() {
        this.themes$ = new Observable(observer => {
            observer.next(this.themes);
            observer.complete();
        });
    }

    getThemes(): Observable<Theme> {  //returns all themes
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
}
