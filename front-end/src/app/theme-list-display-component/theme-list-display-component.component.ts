import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../service/theme.service";
import { Themes } from "../../mocks/theme.mock";
import {Theme} from "../../models/theme.models";

@Component({
    selector: 'app-theme-list-display-component',
    templateUrl: './theme-list-display-component.component.html',
    styleUrls: ['./theme-list-display-component.component.scss']
})

export class ThemeListDisplayComponentComponent implements OnInit {
    themes: any = [];

    constructor(private themeService: ThemeService) { }
    ngOnInit(): void {
        this.themeService.getThemes().subscribe((themes) => {
            this.themes = themes;
        })
    }
}
