import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { SharedModule } from '../../shared/shared.module';
import { AlumnosRoutingModule } from './alumnos.routing.module';

import { BorrarAlumnoComponent } from './components/borrar-alumno/borrar-alumno.component';
import { EditarAlumnoComponent } from './components/editar-alumno/editar-alumno.component';



@NgModule({
  declarations: [    
    AlumnosComponent,
    EditarAlumnoComponent,
    BorrarAlumnoComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule    
  ],
})
export class AlumnosModule { }
