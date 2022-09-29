import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './components/cursos/cursos.component';
import { BorrarCursoComponent } from './components/borrar-curso/borrar-curso.component';
import { EditarCursoComponent } from './components/editar-curso/editar-curso.component';
import { SharedModule } from '../../shared/shared.module';
import { CursosRoutingModule } from './cursos-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { cursoFeatureKey, cursoReducer } from './state/cursos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CursoEffects } from './state/cursos.effects';
import { environment } from '../../../environments/environment.prod';

@NgModule({
  declarations: [
    CursosComponent,
    BorrarCursoComponent,
    EditarCursoComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    StoreModule.forFeature(cursoFeatureKey, cursoReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      name: 'Prueba NgRx',
    }),
    EffectsModule.forFeature([CursoEffects]),    
  ]
})
export class CursosModule { }
