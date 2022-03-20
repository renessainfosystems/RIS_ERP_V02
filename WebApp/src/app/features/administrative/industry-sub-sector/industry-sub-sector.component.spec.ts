import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrySubSectorComponent } from './industry-sub-sector.component';

describe('IndustrySubSectorComponent', () => {
  let component: IndustrySubSectorComponent;
  let fixture: ComponentFixture<IndustrySubSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrySubSectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrySubSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
