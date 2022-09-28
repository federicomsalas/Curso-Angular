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
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CursosService } from './features/cursos/services/cursos.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCERS } from './features/alumnos/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    InicioComponent,
    LoginComponent
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, name: 'Prueba NgRx' }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
