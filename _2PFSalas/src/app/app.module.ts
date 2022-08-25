import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitulosDirective } from './directives/titulos.directive';
import { ConcatenarPipe } from './pipes/concatenar.pipe';
import { GeneroPipe } from './pipes/genero.pipe';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AlumnosModule } from './features/alumnos/alumnos.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,  
    TitulosDirective,
    ConcatenarPipe,
    GeneroPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    SharedModule,
    AppRoutingModule,
    AlumnosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
