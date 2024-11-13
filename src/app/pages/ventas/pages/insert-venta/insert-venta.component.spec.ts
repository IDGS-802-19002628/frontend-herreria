import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertVentaComponent } from './insert-venta.component';

describe('InsertVentaComponent', () => {
  let component: InsertVentaComponent;
  let fixture: ComponentFixture<InsertVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertVentaComponent]
    });
    fixture = TestBed.createComponent(InsertVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
