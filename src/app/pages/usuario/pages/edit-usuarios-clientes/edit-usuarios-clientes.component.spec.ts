import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsuariosClientesComponent } from './edit-usuarios-clientes.component';

describe('EditUsuariosClientesComponent', () => {
  let component: EditUsuariosClientesComponent;
  let fixture: ComponentFixture<EditUsuariosClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUsuariosClientesComponent]
    });
    fixture = TestBed.createComponent(EditUsuariosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
