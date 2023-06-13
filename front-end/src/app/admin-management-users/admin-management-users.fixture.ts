import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";
import {test, expect, Page, ElementHandle} from '@playwright/test';

export class adminManagementUsersFixture extends E2EComponentFixture {
  async addUser(nom: string, prenom: string, age: string, sexe: string, stade: string, requireBigText: boolean, requireBigButtons: boolean, isAdmin: boolean, photoPath: string) {
    // this.page.goto('http://localhost:4200/user-create/1684739070790');

    await this.page.fill('input[formControlName="nom"]', nom);
    await this.page.fill('input[formControlName="prenom"]', prenom);
    await this.page.fill('input[formControlName="age"]', age);


    await this.page.click(`text=${sexe}`);
    await this.page.click(`text=${stade}`);

    await this.page.fill('input[formControlName="path_pp"]', photoPath);

    await this.page.click('text=Créer le nouvel utilisateur');
  }

  async delUser(nom: string) {
    // await this.page.goto('http://localhost:4200/admin/1684739070790');
    // await this.page.click('text=Afficher les patients');
    await this.page.locator(`.${nom}-delete-btn`)?.click();
    await this.page.click('text=oui');
  }

  async modifyUser(oldName: string, nom: string, prenom: string, age: string, sexe: string, stade: string, requireBigText: boolean, requireBigButtons: boolean, isAdmin: boolean, photoPath: string) {
    // await this.page.goto('http://localhost:4200/admin/1684739070790');
    // await this.page.click('text=Afficher les patients');
    await this.page.locator(`.${oldName}-modify-btn`).click();

    await this.page.fill('input[formControlName="nom"]', nom);
    await this.page.fill('input[formControlName="prenom"]', prenom);
    await this.page.fill('input[formControlName="age"]', age);
    await this.page.click(`text=${sexe}`);
    await this.page.click(`text=${stade}`);
    await this.page.fill('input[formControlName="path_pp"]', photoPath);

    await this.page.click('text=Appliquer les modifications');
  }

  async gotoAjouterUtilisateur(adminName: string) {
    this.gotoListePatients(adminName);
    await this.page.click('text=Ajouter un patient');

  }

  async gotoListePatients(adminName: string) {
    await this.page.locator('.logout').click();
    await this.page.click(`text=${adminName}`);
    await this.page.click('text=Afficher les patients');
  }
}



