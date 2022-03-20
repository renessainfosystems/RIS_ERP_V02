import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierApplicationComponent } from './supplier-application.component';

describe('SupplierApplicationComponent', () => {
  let component: SupplierApplicationComponent;
  let fixture: ComponentFixture<SupplierApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
