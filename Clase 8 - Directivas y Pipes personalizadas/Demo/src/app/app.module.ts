import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PipesNativasComponent } from './components/pipes-nativas/pipes-nativas.component';
import { TransformarPipe } from './pipes/transformar.pipe';
import { PipesPersonalizadasComponent } from './components/pipes-personalizadas/pipes-personalizadas.component';
import { DirectivasComponent } from './components/directivas/directivas.component';
import { ResaltadoDirective } from './directives/resaltado.directive';
import { IteradorDirective } from './directives/iterador.directive';

@NgModule({
  declarations: [
    AppComponent,
    PipesNativasComponent,
    TransformarPipe,
    PipesPersonalizadasComponent,
    DirectivasComponent,
    ResaltadoDirective,
    IteradorDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
