import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftinformationComponent } from './shiftinformation.component';

describe('ShiftinformationComponent', () => {
  let component: ShiftinformationComponent;
  let fixture: ComponentFixture<ShiftinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
