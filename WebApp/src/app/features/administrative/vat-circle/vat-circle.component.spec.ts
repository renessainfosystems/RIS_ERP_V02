import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatCircleComponent } from './vat-circle.component';

describe('VatCircleComponent', () => {
  let component: VatCircleComponent;
  let fixture: ComponentFixture<VatCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
