import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommercePlatformComponent } from './ecommerce-platform.component';

describe('EcommercePlatformComponent', () => {
  let component: EcommercePlatformComponent;
  let fixture: ComponentFixture<EcommercePlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcommercePlatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommercePlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
