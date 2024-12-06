import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingContactosComponent } from './landing-contactos.component';

describe('LandingContactosComponent', () => {
  let component: LandingContactosComponent;
  let fixture: ComponentFixture<LandingContactosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LandingContactosComponent]
    });
    fixture = TestBed.createComponent(LandingContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
