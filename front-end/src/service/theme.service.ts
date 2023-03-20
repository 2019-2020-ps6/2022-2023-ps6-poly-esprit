import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import { Theme } from "../models/theme.models";
import { Themes } from "../mocks/theme.mock";
import { Quizz } from "../mocks/quizz.mock";
import { Quiz } from "../models/quizz.models";

@Injectable({
    providedIn: 'root'
})

export class ThemeService {
    private themes$ = new Observable<any>()
    private themes: Theme[] = Themes;

    constructor() {
        this.themes$ = new Observable(observer => {
            observer.next(this.themes);
            observer.complete();
        });
    }

    getThemes(): Observable<any> {
        return this.themes$;
    }
}
