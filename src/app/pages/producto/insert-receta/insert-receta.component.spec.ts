import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRecetaComponent } from './insert-receta.component';

describe('InsertRecetaComponent', () => {
  let component: InsertRecetaComponent;
  let fixture: ComponentFixture<InsertRecetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertRecetaComponent]
    });
    fixture = TestBed.createComponent(InsertRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
