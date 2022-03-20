import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerinfoComponent } from './retailerinfo.component';

describe('RetailerinfoComponent', () => {
  let component: RetailerinfoComponent;
  let fixture: ComponentFixture<RetailerinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
