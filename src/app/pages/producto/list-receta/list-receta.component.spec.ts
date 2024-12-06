import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecetaComponent } from './list-receta.component';

describe('ListRecetaComponent', () => {
  let component: ListRecetaComponent;
  let fixture: ComponentFixture<ListRecetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRecetaComponent]
    });
    fixture = TestBed.createComponent(ListRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
