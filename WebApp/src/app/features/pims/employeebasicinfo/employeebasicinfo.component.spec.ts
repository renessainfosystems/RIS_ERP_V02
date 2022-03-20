import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeebasicinfoComponent } from './employeebasicinfo.component';

describe('EmployeebasicinfoComponent', () => {
  let component: EmployeebasicinfoComponent;
  let fixture: ComponentFixture<EmployeebasicinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeebasicinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeebasicinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
