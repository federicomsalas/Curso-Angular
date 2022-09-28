import { Injectable } from '@angular/core';
import { Curso } from '../../../models/curso';
import { catchError, Observable, Subject, throwError, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  cursoSubject = new Subject<any>();  
  private api: string = environment.API;

  constructor(
    private http: HttpClient
  ) {}

   obtenerCursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(`${this.api}/cursos`)
  }   

  agregarCurso(curso: Curso){
    return this.http.post<Curso>(`${this.api}/cursos`, curso)
    .pipe(
      tap({
        next: (curso) => this.cursoSubject.next(curso),
      })
    );
   }    

   editarCurso(curso: Curso){
    return this.http.put<Curso>(`${this.api}/cursos/${curso.id}`,curso)
    .pipe(
      tap({
        next: (curso) => this.cursoSubject.next(curso),
      })
    );
   }    

   eliminarCurso(elemento: Curso){
    return this.http.delete<Curso>(`${this.api}/cursos/${elemento.id}`)
    .pipe(
      tap({
        next: (curso) => this.cursoSubject.next(curso),
      })
    );
  }   

  
  obtenerCursoPorId(id: any)
  {
    return this.http.get<Curso[]>(`${this.api}/cursos/${id}`)
  }

  // obtenerCursoPorId(id: any)
  // {
  //   this.cursos = JSON.parse(localStorage.getItem('TABLA_CURSOS' ) || '[]') as Curso[];  
  //   const item = this.cursos.find(curso => curso.id == id);            
  //   const index = this.cursos.indexOf(item!);
  //   return this.cursos[index];
  // }

  // obtenerPromiseCursos(){
  //   this.cursos = JSON.parse(localStorage.getItem('TABLA_CURSOS' ) || '[]') as Curso[];  
  //   return new Promise((resolve, reject) => {
  //     if (this.cursos.length > 0)
  //     {
  //       resolve(this.cursos);
  //     }
  //     else
  //     {
  //       reject({
  //         codigo: 0,
  //         mensaje: "No hay Cursos"
  //       });
  //     }
  //   } );
  // }  



}
