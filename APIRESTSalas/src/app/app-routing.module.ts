import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './features/alumnos/components/alumnos/alumnos.component';
import { CursosComponent } from './features/cursos/components/cursos/cursos.component';
import { InicioComponent } from './core/components/inicio/inicio.component';
import { InscripcionesComponent } from './features/inscripciones/components/inscripciones/inscripciones.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { InscripcionesModule } from './features/inscripciones/inscripciones.module';
import { LoginGuard } from './core/guards/login.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {path: 'alumnos',
  loadChildren: () => import('./features/alumnos/alumnos.module').then((m) => m.AlumnosModule),
   canActivate: [AuthGuard]} ,   
     
  {path: 'cursos',
  loadChildren: () => import('./features/cursos/cursos.module').then((m) => m.CursosModule),
    canActivate: [AuthGuard, AdminGuard]} ,      
  {path: 'inscripciones', loadChildren: () => import('./features/inscripciones/inscripciones.module').then((m) => m.InscripcionesModule),
    canActivate: [AuthGuard]} ,      
  {path: 'inicio', component: InicioComponent,  canActivate: [AuthGuard]} ,
  {path: 'login',  component: LoginComponent,  canActivate: [LoginGuard]},    
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '**',  redirectTo: 'inicio', pathMatch: 'full'}    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
