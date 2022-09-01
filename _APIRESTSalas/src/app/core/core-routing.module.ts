import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from '../features/alumnos/components/alumnos/alumnos.component';
import { CursosComponent } from '../features/cursos/components/cursos/cursos.component';
import { InscripcionesComponent } from '../features/inscripciones/components/inscripciones/inscripciones.component';
import { InicioComponent } from './components/inicio/inicio.component';


const routes: Routes = [
  {path: 'alumnos', component: AlumnosComponent} ,      
  {path: 'cursos', component: CursosComponent} ,      
  {path: 'inscripciones', component: InscripcionesComponent} ,      
  {path: 'inicio', component: InicioComponent}    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
