import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsVisualisationComponent } from './stats-visualisation.component';

describe('StatsVisualisationComponent', () => {
  let component: StatsVisualisationComponent;
  let fixture: ComponentFixture<StatsVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsVisualisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
