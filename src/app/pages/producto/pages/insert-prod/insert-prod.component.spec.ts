import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProdComponent } from './insert-prod.component';

describe('InsertProdComponent', () => {
  let component: InsertProdComponent;
  let fixture: ComponentFixture<InsertProdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertProdComponent]
    });
    fixture = TestBed.createComponent(InsertProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
