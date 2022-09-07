import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './components/cursos/cursos.component';
import { BorrarCursoComponent } from './components/borrar-curso/borrar-curso.component';
import { EditarCursoComponent } from './components/editar-curso/editar-curso.component';
import { SharedModule } from '../../shared/shared.module';
import { CursosRoutingModule } from './cursos-routing.module';



@NgModule({
  declarations: [
    CursosComponent,
    BorrarCursoComponent,
    EditarCursoComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule
  ]
})
export class CursosModule { }
