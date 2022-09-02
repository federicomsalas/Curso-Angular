import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UsuarioState } from '../../models/usuario.state.model';
export const selectorUsuario = (state: AppState) => state.sesion;

export const selectorSesion = createSelector(
    selectorUsuario,
    (state: UsuarioState) => state
)