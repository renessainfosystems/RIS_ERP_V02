import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatCommissionerateComponent } from './vat-commissionerate.component';

describe('VatCommissionerateComponent', () => {
  let component: VatCommissionerateComponent;
  let fixture: ComponentFixture<VatCommissionerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatCommissionerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatCommissionerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
