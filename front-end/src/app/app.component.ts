import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  public title: string = 'Hello world!';
  quizSelected = false;


  onQuizClicked(event: Event) {
    this.quizSelected = true;
  }
}
