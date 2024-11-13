import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvmaterialComponent } from './edit-invmaterial.component';

describe('EditInvmaterialComponent', () => {
  let component: EditInvmaterialComponent;
  let fixture: ComponentFixture<EditInvmaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInvmaterialComponent]
    });
    fixture = TestBed.createComponent(EditInvmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
