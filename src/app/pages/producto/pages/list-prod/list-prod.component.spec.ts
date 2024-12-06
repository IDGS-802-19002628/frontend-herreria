import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProdComponent } from './list-prod.component';

describe('ListProdComponent', () => {
  let component: ListProdComponent;
  let fixture: ComponentFixture<ListProdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProdComponent]
    });
    fixture = TestBed.createComponent(ListProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
