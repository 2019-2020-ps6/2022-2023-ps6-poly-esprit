import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";


export class statsFixture extends E2EComponentFixture {

  async goToStats(userName: string) {
    await this.page.goto("http://localhost:4200");
    await this.page.click('text=Admin Admin');
    await this.page.click('text=Afficher les patients');
    
    await this.page.click('text=' + userName);
    await this.page.click('text=Afficher les statistiques');

  }
}