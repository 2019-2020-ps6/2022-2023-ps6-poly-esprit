import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagementUsersComponent } from './admin-management-users.component';

describe('AdminManagementUsersComponent', () => {
  let component: AdminManagementUsersComponent;
  let fixture: ComponentFixture<AdminManagementUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManagementUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManagementUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
