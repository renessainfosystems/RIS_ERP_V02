import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAssessmentComponent } from './supplierassessment.component';

describe('SupplierAssessmentComponent', () => {
    let component: SupplierAssessmentComponent;
    let fixture: ComponentFixture<SupplierAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [SupplierAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
      fixture = TestBed.createComponent(SupplierAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
