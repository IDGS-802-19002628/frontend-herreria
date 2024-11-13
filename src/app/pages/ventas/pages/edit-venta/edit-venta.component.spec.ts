import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVentaComponent } from './edit-venta.component';

describe('EditVentaComponent', () => {
  let component: EditVentaComponent;
  let fixture: ComponentFixture<EditVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVentaComponent]
    });
    fixture = TestBed.createComponent(EditVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
