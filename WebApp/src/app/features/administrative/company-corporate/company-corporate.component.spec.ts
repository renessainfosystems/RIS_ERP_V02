import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCorporateComponent } from './company-corporate.component';

describe('CompanyCorporateComponent', () => {
  let component: CompanyCorporateComponent;
  let fixture: ComponentFixture<CompanyCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCorporateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

