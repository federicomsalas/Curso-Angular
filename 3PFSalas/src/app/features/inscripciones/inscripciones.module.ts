import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './components/inscripciones/inscripciones.component';
import { BorrarInscripcionComponent } from './components/borrar-inscripcion/borrar-inscripcion.component';
import { SharedModule } from '../../shared/shared.module';
import { EditarInscripcionComponent } from './components/editar-inscripcion/editar-inscripcion.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';



@NgModule({
  declarations: [
    InscripcionesComponent,
    BorrarInscripcionComponent,
    EditarInscripcionComponent

  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule
  ]
})
export class InscripcionesModule { }
