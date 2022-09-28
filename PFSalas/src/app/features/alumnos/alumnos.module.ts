import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { SharedModule } from '../../shared/shared.module';
import { AlumnosRoutingModule } from './alumnos.routing.module';

import { BorrarAlumnoComponent } from './components/borrar-alumno/borrar-alumno.component';
import { EditarAlumnoComponent } from './components/editar-alumno/editar-alumno.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { alumnoFeatureKey, alumnoReducer } from './state/alumnos.reducers';
import { AlumnosEffects } from './state/alumnos.effects';

@NgModule({
  declarations: [    
    AlumnosComponent,
    EditarAlumnoComponent,
    BorrarAlumnoComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule,
    StoreModule.forFeature(alumnoFeatureKey, alumnoReducer),
    EffectsModule.forFeature([AlumnosEffects]),       
  ],
})
export class AlumnosModule { }
