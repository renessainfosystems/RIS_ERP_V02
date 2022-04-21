import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerAssessmentComponent } from './dealer-assessment.component';

describe('DealerAssessmentComponent', () => {
  let component: DealerAssessmentComponent;
  let fixture: ComponentFixture<DealerAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
