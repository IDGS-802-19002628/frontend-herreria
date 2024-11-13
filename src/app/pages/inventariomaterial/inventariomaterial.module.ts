import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertInvmaterialComponent } from './pages/insert-invmaterial/insert-invmaterial.component';
import { EditInvmaterialComponent } from './pages/edit-invmaterial/edit-invmaterial.component';
import { ListInvmaterialComponent } from './pages/list-invmaterial/list-invmaterial.component';




@NgModule({
  declarations: [
    InsertInvmaterialComponent,
    EditInvmaterialComponent,
    ListInvmaterialComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class InventariomaterialModule { }
