import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarDialogComponent } from './components/editar-dialog/editar-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { AlumnosService } from './services/alumnos.service';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [    
    EditarDialogComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,  
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    AlumnosService
  ]

})
export class AlumnosModule { }
