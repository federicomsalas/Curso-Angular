import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Componente2Component } from './components/componente2/componente2.component';
import { AlumnoService } from './services/alumno.service';
import { CursoService } from './services/curso.service';
import { CursosAlphaService } from './services/cursos-alpha.service';
import { environment } from '../environments/environment';
import { config, configtoken } from './config';

@NgModule({
  declarations: [
    AppComponent,
    Componente2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AlumnoService,
    {provide: CursoService, useExisting: CursosAlphaService},
    {provide: CursoService, useClass: CursosAlphaService},    
    {provide: CursoService, useFactory: () => { 
      return environment.experimental ? new CursosAlphaService() : new CursoService();
    } },
    {provide: configtoken, useValue: config}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
