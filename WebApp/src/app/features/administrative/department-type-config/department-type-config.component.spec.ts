import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTypeConfigComponent } from './department-type-config.component';

describe('DepartmentTypeConfigComponent', () => {
  let component: DepartmentTypeConfigComponent;
  let fixture: ComponentFixture<DepartmentTypeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentTypeConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentTypeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
