import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuPermissionComponent } from './user-menu-permission.component';

describe('UserMenuPermissionComponent', () => {
  let component: UserMenuPermissionComponent;
  let fixture: ComponentFixture<UserMenuPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMenuPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
