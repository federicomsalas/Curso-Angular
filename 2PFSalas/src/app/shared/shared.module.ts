import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { ConcatenarPipe } from './pipes/concatenar.pipe';
import { GeneroPipe } from './pipes/genero.pipe';
import { TitulosDirective } from './directives/titulos.directive';



@NgModule({
  declarations: [    
    ConcatenarPipe,
    GeneroPipe,
    TitulosDirective],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule, 
    ConcatenarPipe,
    GeneroPipe,
    TitulosDirective
  ]
})
export class SharedModule { }
