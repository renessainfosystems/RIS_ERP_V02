import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryHeadComponent } from './salary-head.component';

describe('SalaryHeadComponent', () => {
  let component: SalaryHeadComponent;
  let fixture: ComponentFixture<SalaryHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
