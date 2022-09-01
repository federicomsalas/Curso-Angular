import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './components/core/core.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AlumnosModule } from '../features/alumnos/alumnos.module';
import { CursosModule } from '../features/cursos/cursos.module';
import { InscripcionesModule } from '../features/inscripciones/inscripciones.module';



@NgModule({
  declarations: [
    CoreComponent,
    NavbarComponent,
    ToolbarComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    AlumnosModule,
    CursosModule,
    InscripcionesModule    
  ]
})
export class CoreModule { }
