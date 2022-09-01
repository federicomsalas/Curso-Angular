import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { InicioComponent } from '../../core/components/inicio/inicio.component';

const routes : Routes = [


]

@NgModule({
  imports: [RouterModule.forChild(routes)]
, exports: [RouterModule] 
})
export class AlumnosRoutingModule { }
