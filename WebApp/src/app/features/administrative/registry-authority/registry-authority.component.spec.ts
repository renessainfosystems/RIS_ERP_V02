import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryAuthorityComponent } from './registry-authority.component';

describe('RegistryAuthorityComponent', () => {
  let component: RegistryAuthorityComponent;
  let fixture: ComponentFixture<RegistryAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistryAuthorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
