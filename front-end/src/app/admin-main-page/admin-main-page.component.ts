import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../models/quizz.models";
import {UserService} from "../../service/user.service";
import {QuizService} from "../../service/quiz.service";
import {ThemeService} from "../../service/theme.service";
import {ActivatedRoute} from "@angular/router";
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Theme} from "../../models/theme.models";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.scss']
})
export class AdminMainPageComponent implements OnInit {
  selectedTheme: any;
  quizListVisible = false;
  title = "Page de contrôle";
  admin_id: string | null;
  public UService : UserService;
  private QCService: QuizService;
  public quizForm: FormGroup;

  formulaire: FormGroup;
  id_quiz: string | null = "";

  public THService : ThemeService;
  themes :Theme[] =[]

  idUser: any;
  quizVisible = false;
  deleteVisible = false;
  inputValueName = "";
  inputValueTheme = "";
  constructor(private router: Router,private route: ActivatedRoute, private userService : UserService, private themeService: ThemeService, private quizService: QuizService ,public quizCreateService: QuizService, public formBuilder: FormBuilder) {
    this.admin_id = this.route.snapshot.paramMap.get('id_user');

    this.UService=userService;
    this.QCService = quizService;
    this.THService = themeService;
    this.formulaire = this.formBuilder.group({},{});
    this.THService=themeService;
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
    });
  }


  ngOnInit(){
    this.id_quiz = this.route.snapshot.paramMap.get('id');
    this.THService.getThemes().subscribe((themes)=> {
      this.themes = themes;
    });
    if(this.themes.length != 0){
      window.location.reload();
      console.log(this.themes.length);

    }
  }

  redirectToRoute() {
    this.router.navigate(['/themes/'+this.admin_id]);
  }

  // Modification de la méthode addQuiz pour rendre la div "first" visible
  addQuiz(){
    const themeToCreate : Theme = this.quizForm.getRawValue() as Theme;
    themeToCreate.id=this.themeService.getIndexToCreate();
    themeToCreate.name=this.quizForm.value.theme;
    themeToCreate.quizzes=[];
    console.log(themeToCreate.id, themeToCreate.name);

    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    quizToCreate.id=this.quizCreateService.getIndexToCreate();

    quizToCreate.questions=[];
    quizToCreate.name = this.quizForm.value.name;
    this.QCService.addQuiz(this.quizForm.value.name);

    this.THService.addQuiz(this.quizForm.value.name, this.quizForm.value.theme);
    this.quizVisible = true;
    this.deleteVisible=true;
  }

  openPopup() {
    this.quizVisible=true;
    this.deleteVisible=false;
  }

  addQuizForTheme(theme: any) {
    this.quizVisible=true;
    this.deleteVisible=false;
    this.inputValueTheme = theme;
  }

  openDelete(id:string) {
    this.deleteVisible=true;
    this.quizVisible=false;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    this.id_quiz=id
  }

  closePopup() {
    this.quizVisible=false;
    this.deleteVisible=false;
    this.inputValueName = "";
    this.inputValueTheme = "";

  }
  onSubmit() {
    if(this.id_quiz!=null){
      this.QCService.deleteQuiz(this.id_quiz);
      this.THService.deleteQuiz(this.id_quiz);
      this.deleteVisible=false;
    }
  }
  closeDelete() {
    this.deleteVisible = false;
  }

  onSelectTheme(theme: any) {
    if (this.selectedTheme === theme) {
      // Si le même thème est sélectionné à nouveau, inverser l'état d'affichage
      this.quizListVisible = !this.quizListVisible;
    } else {
      // Si un nouveau thème est sélectionné, mettre à jour le thème et afficher la liste des quiz
      this.selectedTheme = theme;
      this.quizListVisible = true;
    }
  }

  idThemeOnLocalStorage() {
    localStorage.setItem('idTheme', this.selectedTheme.id);
  }
}
