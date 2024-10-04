import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsuariosEmpleadosComponent } from './edit-usuarios-empleados.component';

describe('EditUsuariosEmpleadosComponent', () => {
  let component: EditUsuariosEmpleadosComponent;
  let fixture: ComponentFixture<EditUsuariosEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUsuariosEmpleadosComponent]
    });
    fixture = TestBed.createComponent(EditUsuariosEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
