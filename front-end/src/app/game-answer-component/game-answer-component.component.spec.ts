import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAnswerComponentComponent } from './game-answer-component.component';

describe('GameAnswerComponentComponent', () => {
  let component: GameAnswerComponentComponent;
  let fixture: ComponentFixture<GameAnswerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameAnswerComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameAnswerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
