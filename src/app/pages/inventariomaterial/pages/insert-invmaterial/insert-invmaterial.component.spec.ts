import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertInvmaterialComponent } from './insert-invmaterial.component';

describe('InsertInvmaterialComponent', () => {
  let component: InsertInvmaterialComponent;
  let fixture: ComponentFixture<InsertInvmaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertInvmaterialComponent]
    });
    fixture = TestBed.createComponent(InsertInvmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
