import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatDivisionComponent } from './vat-division.component';

describe('VatDivisionComponent', () => {
  let component: VatDivisionComponent;
  let fixture: ComponentFixture<VatDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatDivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
