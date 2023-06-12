import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {Question} from "../../models/question.models";
import {QuestionService} from "../../service/question.service";
import {GameInstance} from "../../models/gameInstance.models";
import {ActivatedRoute} from "@angular/router";
import { PlayerStatsService } from '../../service/playersStats.service';

@Component({
  selector: 'app-game-end-component',
  templateUrl: './game-end-component.component.html',
  styleUrls: ['./game-end-component.component.scss']
})
export class GameEndComponentComponent implements AfterViewInit {
  @Input() gameInstance?: GameInstance;
  @Input() shared_clicks?: number;
  public userId: number;
  visibleRecap: boolean = false;
  message: string = '';

  ngAfterViewInit(): void {
    this.attractedButton();
    this.updateMessage();
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

  constructor(private route: ActivatedRoute, private playerStatsService: PlayerStatsService){
    this.userId = Number(this.route.snapshot.paramMap.get('idUser'));
  }

  viewRecap() {
    this.visibleRecap = !this.visibleRecap;
  }

  private updateMessage() {
    //TODO : Quand le back-end sera implémenté pour la partie quiz, on pourra regarder si le score du patient > 50% des questions
    if (this.gameInstance) {
      let scorefinal = this.gameInstance.score;
      if (scorefinal > 0) {
        this.message = `Bravo ! Vous avez terminé le quiz avec ${scorefinal} point${scorefinal > 1 ? 's' : ''}.`;
      } else if (scorefinal === 0) {
        this.message = 'Dommage ! Vous allez vous améliorer !';
      } else {
        this.message = `Ne vous découragez pas ! Vous avez terminé le quiz avec une note négative de ${-scorefinal} point${this.gameInstance.score < -1 ? 's' : ''}.`;
      }
    }
    if (this.shared_clicks == undefined || this.gameInstance == undefined) {
      return;
    }
    let score = ~~(this.gameInstance.score/this.gameInstance.gameQuestionsAnswers.length*100);
    console.log("userId", this.userId);
    console.log("score", score);
    console.log("shared_clicks", this.shared_clicks);
    this.playerStatsService.endGame(this.userId, score, this.shared_clicks);
  }

}
