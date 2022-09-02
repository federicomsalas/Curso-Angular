import { Usuario } from './usuario';

export interface UsuarioState{
    sesionActiva: boolean;
    usuario: Usuario
}