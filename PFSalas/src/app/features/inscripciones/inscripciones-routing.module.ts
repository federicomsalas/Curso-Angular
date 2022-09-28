import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscripcionesComponent } from './components/inscripciones/inscripciones.component';

const routes : Routes = [

  {path: '',
  component: InscripcionesComponent   }

]

@NgModule({
  imports: [RouterModule.forChild(routes)]
, exports: [RouterModule] 
})
export class InscripcionesRoutingModule { }
