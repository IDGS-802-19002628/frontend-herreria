import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUsuariosClientesComponent } from './insert-usuarios-clientes.component';

describe('InsertUsuariosClientesComponent', () => {
  let component: InsertUsuariosClientesComponent;
  let fixture: ComponentFixture<InsertUsuariosClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUsuariosClientesComponent]
    });
    fixture = TestBed.createComponent(InsertUsuariosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
