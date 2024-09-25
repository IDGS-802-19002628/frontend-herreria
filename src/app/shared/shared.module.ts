import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconRegistry } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TableActionsComponent } from './components/table-actions/table-actions.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    TableActionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgApexchartsModule,
    TablerIconsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatProgressSpinnerModule,

  ],
  providers: [MatIconRegistry,
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
  ],
  exports: [
    LoadingSpinnerComponent,
    TableActionsComponent
  ]
})
export class SharedComponentModule { }
