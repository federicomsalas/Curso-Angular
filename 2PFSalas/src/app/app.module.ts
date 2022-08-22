import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ContentComponent } from './components/content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarDialogComponent } from './components/editar-dialog/editar-dialog.component';
import { TitulosDirective } from './directives/titulos.directive';
import { ConcatenarPipe } from './pipes/concatenar.pipe';
import { GeneroPipe } from './pipes/genero.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    ContentComponent,
    EditarDialogComponent,
    TitulosDirective,
    ConcatenarPipe,
    GeneroPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    AppMaterialModule,
    ReactiveFormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
