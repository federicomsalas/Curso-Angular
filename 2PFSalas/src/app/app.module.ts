import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AlumnosModule } from './features/alumnos/alumnos.module';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { InicioComponent } from './core/components/inicio/inicio.component';
import { CursosModule } from './features/cursos/cursos.module';
import { InscripcionesModule } from './features/inscripciones/inscripciones.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    InicioComponent
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AlumnosModule,
    CursosModule,
    InscripcionesModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
