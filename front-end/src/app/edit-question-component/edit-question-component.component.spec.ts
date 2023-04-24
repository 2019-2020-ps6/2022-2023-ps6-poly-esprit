import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionComponentComponent } from './edit-question-component.component';

describe('EditQuestionComponentComponent', () => {
  let component: EditQuestionComponentComponent;
  let fixture: ComponentFixture<EditQuestionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuestionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
