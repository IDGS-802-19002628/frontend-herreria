import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsuariosEmpleadosComponent } from './list-usuarios-empleados.component';

describe('ListUsuariosEmpleadosComponent', () => {
  let component: ListUsuariosEmpleadosComponent;
  let fixture: ComponentFixture<ListUsuariosEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUsuariosEmpleadosComponent]
    });
    fixture = TestBed.createComponent(ListUsuariosEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
