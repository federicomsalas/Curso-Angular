import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './components/cursos/cursos.component';
import { BorrarCursoComponent } from './components/borrar-curso/borrar-curso.component';
import { EditarCursoComponent } from './components/editar-curso/editar-curso.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    CursosComponent,
    BorrarCursoComponent,
    EditarCursoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CursosModule { }
