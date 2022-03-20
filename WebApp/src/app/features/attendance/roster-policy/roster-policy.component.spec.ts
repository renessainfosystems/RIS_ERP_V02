import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterPolicyComponent } from './roster-policy.component';

describe('RosterPolicyComponent', () => {
  let component: RosterPolicyComponent;
  let fixture: ComponentFixture<RosterPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
