import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {GameInstance, GameQuestionAnswer} from "../models/gameInstance.models";
@Injectable({
  providedIn: 'root'
})
export class GameInstanceService {
  //The list of quiz. The list is
  // retrieved from the mock.
  private gameInstances$ = new Observable<any>();
  public gameInstances: GameInstance[] = []; // Ici on initialise la valeur avec un mock QUIZ_LIST
  // The service's constructor. Le constructeur peut prendre en paramètre les dépendances du service - comme ici,
  // HttpClient qui va permettre de récupérer les données d'un serveur
  constructor() {
    this.gameInstances$ = new Observable(observer => {
      observer.next(this.gameInstances);
      observer.complete();
    });
  }

  addGameInstance(gameInstance: GameInstance){
    this.gameInstances.push(gameInstance);
    console.log("Une nouvelle instance de game a été ajoutée avec comme id :"+gameInstance.Id+" et en score: "+gameInstance.score+"\n");
    console.log("Le mock possède maintenant:" +this.gameInstances.length +"gameInstances");
  }

  getGameInstances(): Observable<any> {
    return this.gameInstances$;
  }

  deleteGameInstance(id: String){
    //delete the gameInstance on the specific id
    this.gameInstances = this.gameInstances.filter(gameInstance => gameInstance.Id !== id);
    console.log("Le mock possède maintenant:" +this.gameInstances.length +"questions");
  }



}
