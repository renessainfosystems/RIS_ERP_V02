import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerinfoComponent } from './dealerinfo.component';

describe('DealerinfoComponent', () => {
  let component: DealerinfoComponent;
  let fixture: ComponentFixture<DealerinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
