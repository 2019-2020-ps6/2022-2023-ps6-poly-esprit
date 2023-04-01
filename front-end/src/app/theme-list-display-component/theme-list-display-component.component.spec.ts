import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeListDisplayComponentComponent } from './theme-list-display-component.component';

describe('ThemeListDisplayComponentComponent', () => {
  let component: ThemeListDisplayComponentComponent;
  let fixture: ComponentFixture<ThemeListDisplayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeListDisplayComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeListDisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
