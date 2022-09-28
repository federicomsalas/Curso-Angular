import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../models/usuario';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  obtenerSesionSubject: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(    
    JSON.parse(localStorage.getItem('SESSION') || 'false')
  );

  obtenerSesion(): Observable<Usuario> {
    return this.obtenerSesionSubject.asObservable();
  }

  get isAdmin(): Observable<boolean> {
    return this.obtenerSesion().pipe(
      map((sesion: Usuario) => {
        if(sesion.admin){
          return true;
        }else{
          alert("No tiene permisos");
          return false;
        }
      })
    );
  }

  constructor(private http: HttpClient
    ,private router: Router) { }

  IniciarSesion(usuario: string, contrasena: string): Observable<Usuario> {
    return this.http
      .get<Usuario[]>(`${environment.API}/usuarios`)
      .pipe(
        map((usuarios: Usuario[]) => {
          return usuarios.filter(
            (u) => u.usuario === usuario && u.contrasena === contrasena
          )[0];
        })
      )
      .pipe(
        tap((res: any) => {
          if (res) {
            this.establecerSesion(res);
            this.obtenerSesionSubject.next(res);
          }
        })
      );
  }

  establecerSesion(usuario: Usuario) {
    localStorage.setItem('SESSION', JSON.stringify(usuario));
    this.router.navigate(['inicio']);
  }

  cerrarSesion(): void {
    localStorage.removeItem('SESSION');
    this.router.navigate(['inicio']);
    let userVacio: any;
    this.obtenerSesionSubject.next(userVacio);
  }

}
