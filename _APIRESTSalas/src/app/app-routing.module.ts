import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './features/alumnos/components/alumnos/alumnos.component';
import { CursosComponent } from './features/cursos/components/cursos/cursos.component';
import { InicioComponent } from './core/components/inicio/inicio.component';
import { InscripcionesComponent } from './features/inscripciones/components/inscripciones/inscripciones.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**',  redirectTo: 'inicio', pathMatch: 'full'}     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
