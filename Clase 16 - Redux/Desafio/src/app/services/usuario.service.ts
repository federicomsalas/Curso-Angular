import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  login(nombreUsuario: string, contrasena: string){
    return this.http.get<Usuario[]>('https://6308098f46372013f575799e.mockapi.io/usuarios')
    .pipe(map( (usuarios: Usuario[])=>
    usuarios.filter(usuario => usuario.usuario === nombreUsuario && usuario.contrasena === contrasena)
    ));

  }
}
