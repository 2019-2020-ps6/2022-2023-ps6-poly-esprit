import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, of, throwError} from "rxjs";
import { Theme } from "../models/theme.models";
import { Themes } from "../mocks/theme.mock";
import { Quizz } from "../mocks/quizz.mock";
import { Quiz } from "../models/quizz.models";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {waitForAsync} from "@angular/core/testing";


@Injectable({
    providedIn: 'root'
})

export class ThemeService {
    private themeUrl = serverUrl + '/themes';
    private quizUrl = serverUrl + '/themes';
    private httpOptions = httpOptionsBase;


    private themes$ = new BehaviorSubject<Theme[]>([]);
  // @ts-ignore
    private themes: Theme[] = Themes;

    constructor(private http: HttpClient) {
        this.retrieveThemes();
        // this.themes$ = new Observable(observer => {
        //     observer.next(this.themes);
        //     observer.complete();
        // });
    }

    getThemes(): Observable<Theme[]> {  //returns all themes
        return this.themes$;
    }

    getTheme(id: number): Observable<Theme> {
      const theme = this.themes.find(t => t.id == id);
      console.log("theme " + this.themes[0].name);
      if (theme) {
        return of(theme);
      } else {
        return throwError(`Theme with ID ${id} not found.`);
      }
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

  addQuiz(quizName: Quiz, nameTheme: String) {
    //Loop through themes, if theme exists, add quiz to theme, else create theme and add quiz to theme
    let themeExists = false;
    for(let i =0; i < this.themes.length; i++){
      let themeToCheck = this.themes[i];
      if(themeToCheck.name == nameTheme){
        themeExists = true;
        if (themeToCheck.quizzes) {
          console.log(nameTheme);
          // ici, faire un post de quiz, le quiz doit appartenir à un theme
          this.quizUrl = serverUrl + '/themes/' + themeToCheck.id + "/quizzes";
          this.http.post<{name: String, themeId: Number}>(this.quizUrl, {name:quizName, themeId: themeToCheck.id}, this.httpOptions).subscribe(() => this.retrieveThemes());
        }
        break;
      }
    }
    if(!themeExists){
      console.log("theme doesn't exist");

      this.http.post<{name: String, id?:Number,quizzes?:Quiz[] }>(this.themeUrl, {name: nameTheme}, this.httpOptions).subscribe((theme) => {
        this.retrieveThemes();
        console.log(theme)
        console.log("Après avoir post un Theme", theme);

        this.quizUrl = this.themeUrl + "/" + theme.id + "/quizzes";
        console.log("Avant de post un quiz", theme.id);

        this.http.post<{name: String, themeId: Number}>(this.quizUrl, {name: quizName, themeId: theme.id}, this.httpOptions).subscribe(() => {
          console.log(theme.quizzes);
          this.retrieveThemes();
        });
      });
    }
  }

  getIndexToCreate(){
      return this.themes.length;
  }

  private retrieveThemes(): void {
      this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
        this.themes = themeList;
        this.themes$.next(this.themes);
      })

  }
}
