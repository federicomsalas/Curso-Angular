import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './components/inscripciones/inscripciones.component';
import { BorrarInscripcionComponent } from './components/borrar-inscripcion/borrar-inscripcion.component';
import { SharedModule } from '../../shared/shared.module';
import { EditarInscripcionComponent } from './components/editar-inscripcion/editar-inscripcion.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { ListaInscripcionesComponent } from './components/lista-inscripciones/lista-inscripciones.component';
import { ListaInscripcionesCursosComponent } from './components/lista-inscripciones-cursos/lista-inscripciones-cursos.component';



@NgModule({
  declarations: [
    InscripcionesComponent,
    BorrarInscripcionComponent,
    EditarInscripcionComponent,
    ListaInscripcionesComponent,
    ListaInscripcionesCursosComponent

  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule
  ]
})
export class InscripcionesModule { }
