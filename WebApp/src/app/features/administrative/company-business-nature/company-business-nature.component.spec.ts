import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBusinessNatureComponent } from './company-business-nature.component';

describe('CompanyBusinessNatureComponent', () => {
  let component: CompanyBusinessNatureComponent;
  let fixture: ComponentFixture<CompanyBusinessNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyBusinessNatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBusinessNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
