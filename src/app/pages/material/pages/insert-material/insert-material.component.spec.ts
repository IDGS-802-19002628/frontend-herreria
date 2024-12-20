import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMaterialComponent } from './insert-material.component';

describe('InsertMaterialComponent', () => {
  let component: InsertMaterialComponent;
  let fixture: ComponentFixture<InsertMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertMaterialComponent]
    });
    fixture = TestBed.createComponent(InsertMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
