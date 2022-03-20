import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAuthPermissionComponent } from './menu-auth-permission.component';

describe('MenuAuthPermissionComponent', () => {
  let component: MenuAuthPermissionComponent;
  let fixture: ComponentFixture<MenuAuthPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAuthPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAuthPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
