import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListDisplayComponent } from './quiz-list-display.component';

describe('QuizzListDisplayComponent', () => {
  let component: QuizListDisplayComponent;
  let fixture: ComponentFixture<QuizListDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizListDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
