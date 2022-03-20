import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfsComponent } from './mfs.component';

describe('MfsComponent', () => {
  let component: MfsComponent;
  let fixture: ComponentFixture<MfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
