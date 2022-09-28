import { ActionReducerMap } from '@ngrx/store';
import { AlumnoState } from 'src/app/models/alumno.state';
import { alumnoReducer } from './state/alumnos.reducers';

export interface AppState {
  alumnos: AlumnoState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  alumnos: alumnoReducer,
};
