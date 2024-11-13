import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMaterialComponent } from './pages/list-material/list-material.component';
import { EditMaterialComponent } from './pages/edit-material/edit-material.component';
import { InsertMaterialComponent } from './pages/insert-material/insert-material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { SharedComponentModule } from 'src/app/shared/shared.module';

import { RouterModule } from '@angular/router';
import { MaterialComponentsRoutes } from './material.routes';




@NgModule({
  declarations: [
    ListMaterialComponent,
    EditMaterialComponent,
    InsertMaterialComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    TablerIconsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    SharedComponentModule,
    
  ]
})
export class MaterialModule { }
