import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {Question} from "../../models/question.models";
import {QuestionService} from "../../service/question.service";
import {GameInstance} from "../../models/gameInstance.models";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-end-component',
  templateUrl: './game-end-component.component.html',
  styleUrls: ['./game-end-component.component.scss']
})
export class GameEndComponentComponent implements AfterViewInit {
  @Input() gameInstance?: GameInstance;
  public userId: number;
  visibleRecap: boolean = false;


  ngAfterViewInit(): void {
    this.attractedButton();
  }

  private attractedButton() {
    const buttons = document.querySelectorAll('button');



    const window = document.querySelector('body');

    buttons.forEach(button => {
      window?.addEventListener('mousemove', e => {

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const buttonX = button.offsetLeft + button.clientWidth / 2;
        const buttonY = button.offsetTop + button.clientHeight / 2;

        const buttonLeft = button.offsetLeft;
        const buttonRight = button.offsetLeft + button.clientWidth;
        const buttonTop = button.offsetTop;
        const buttonBottom = button.offsetTop + button.clientHeight;

        const distanceLeft = Math.sqrt((mouseX - buttonLeft) ** 2 + (mouseY - buttonY) ** 2);
        const distanceRight = Math.sqrt((mouseX - buttonRight) ** 2 + (mouseY - buttonY) ** 2);
        const distanceTop = Math.sqrt((mouseX - buttonX) ** 2 + (mouseY - buttonTop) ** 2);
        const distanceBottom = Math.sqrt((mouseX - buttonX) ** 2 + (mouseY - buttonBottom) ** 2);

        // Trouver la distance minimale
        const minDistance = Math.min(distanceLeft, distanceRight, distanceTop, distanceBottom);

        if (minDistance < 90) { // 90 = rayon du bouton
          button.style.transform = 'scale(1.5)';
          if(button.classList.contains('btn-hide-recap')) {
            button.style.background = 'lightgrey';
          }
        } else {
          button.style.transform = 'scale(1)';
          if(button.classList.contains('btn-hide-recap')) {
            button.style.background = '';
          }
        }
      });
    })

  }

  constructor(private route: ActivatedRoute){
    this.userId = Number(this.route.snapshot.paramMap.get('idUser'));
  }

  viewRecap() {
    this.visibleRecap = !this.visibleRecap;
  }
}
