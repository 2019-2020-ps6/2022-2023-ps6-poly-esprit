import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameQuestionComponentComponent } from './game-question-component.component';

describe('GameQuestionComponentComponent', () => {
  let component: GameQuestionComponentComponent;
  let fixture: ComponentFixture<GameQuestionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameQuestionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameQuestionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
