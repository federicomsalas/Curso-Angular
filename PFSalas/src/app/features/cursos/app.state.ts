import { ActionReducerMap } from '@ngrx/store';
import { CursoState } from 'src/app/models/curso.state';
import { cursoReducer } from './state/cursos.reducer';

export interface AppState {
  cursos: CursoState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  cursos: cursoReducer,
};
