import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './core/components/inicio/inicio.component';
import { CursosModule } from './cursos/cursos.module';
import { CursosService } from './cursos/services/cursos.service';
import { CoreService } from './core/services/core.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CursosModule,
    BrowserAnimationsModule,
    SharedModule  
  ],
  providers: [CoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
