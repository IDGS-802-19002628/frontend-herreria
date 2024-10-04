import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsuariosClientesComponent } from './list-usuarios-clientes.component';

describe('ListUsuariosClientesComponent', () => {
  let component: ListUsuariosClientesComponent;
  let fixture: ComponentFixture<ListUsuariosClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUsuariosClientesComponent]
    });
    fixture = TestBed.createComponent(ListUsuariosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
