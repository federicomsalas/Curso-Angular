import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './features/alumnos/components/alumnos/alumnos.component';



const routes: Routes = [
  {path: 'alumnos', component: AlumnosComponent},
  {path: '', redirectTo:'inicio', pathMatch:'full'},
  /*{path: '**', component: AlumnosComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
