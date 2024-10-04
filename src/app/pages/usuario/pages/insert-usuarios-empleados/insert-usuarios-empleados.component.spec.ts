import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUsuariosEmpleadosComponent } from './insert-usuarios-empleados.component';

describe('InsertUsuariosEmpleadosComponent', () => {
  let component: InsertUsuariosEmpleadosComponent;
  let fixture: ComponentFixture<InsertUsuariosEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUsuariosEmpleadosComponent]
    });
    fixture = TestBed.createComponent(InsertUsuariosEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
