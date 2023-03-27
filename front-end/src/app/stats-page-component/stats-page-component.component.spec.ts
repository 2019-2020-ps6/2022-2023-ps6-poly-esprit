import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPageComponentComponent } from './stats-page-component.component';

describe('StatsPageComponentComponent', () => {
  let component: StatsPageComponentComponent;
  let fixture: ComponentFixture<StatsPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsPageComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
