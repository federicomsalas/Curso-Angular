import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Usuario } from '../../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  alumnos: Usuario[] = [];
  private api: string = environment.API;

  constructor(
    private http: HttpClient
  ) {
    
   }

   obtenerUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.api}/usuarios`)
  }   

  agregarUsuario(usuario: Usuario){
    return this.http.post<Usuario>(`${this.api}/usuarios`, usuario);
   }    

   editarUsuario(usuario: Usuario){
    return this.http.put<Usuario>(`${this.api}/usuarios/${usuario.id}`,usuario);
   }    




}
