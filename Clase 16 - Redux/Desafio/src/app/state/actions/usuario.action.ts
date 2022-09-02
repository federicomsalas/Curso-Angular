import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuario';

export const crearSesion = createAction("[Auth Login] Sesión iniciada",
props<{usuario: Usuario}>()
)