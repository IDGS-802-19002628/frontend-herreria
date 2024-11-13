import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvmaterialComponent } from './list-invmaterial.component';

describe('ListInvmaterialComponent', () => {
  let component: ListInvmaterialComponent;
  let fixture: ComponentFixture<ListInvmaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInvmaterialComponent]
    });
    fixture = TestBed.createComponent(ListInvmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
