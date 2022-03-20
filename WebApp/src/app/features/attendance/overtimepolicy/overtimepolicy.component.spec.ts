import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimepolicyComponent } from './overtimepolicy.component';

describe('OvertimepolicyComponent', () => {
  let component: OvertimepolicyComponent;
  let fixture: ComponentFixture<OvertimepolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimepolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
