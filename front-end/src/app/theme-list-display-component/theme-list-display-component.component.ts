import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../service/theme.service";
import { Themes } from "../../mocks/theme.mock";
import {Theme} from "../../models/theme.models";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-theme-list-display-component',
    templateUrl: './theme-list-display-component.component.html',
    styleUrls: ['./theme-list-display-component.component.scss']
})

export class ThemeListDisplayComponentComponent implements OnInit {
    public title:string = "Liste des thèmes";
    userId:string;
    themes: any = [];

    constructor(private themeService: ThemeService, private route: ActivatedRoute) {
      this.userId = String(route.snapshot.paramMap.get("idUser"));

    }
    ngOnInit(): void {
        this.themeService.getThemes().subscribe((themes) => {
            this.themes = themes;
        })
    }
}
