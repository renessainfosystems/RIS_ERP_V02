import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipTypeComponent } from './ownership-type.component';

describe('OwnershipTypeComponent', () => {
  let component: OwnershipTypeComponent;
  let fixture: ComponentFixture<OwnershipTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnershipTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnershipTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
