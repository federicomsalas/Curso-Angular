import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { Alumno } from '../../../models/alumno';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  alumnos: Alumno[] = [];
  private api: string = environment.API;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    
   }



   obtenerAlumnos(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(`${this.api}/alumnos`)
  }   

  agregarAlumno(alumno: Alumno){
    return this.http.post<Alumno>(`${this.api}/alumnos`, alumno);
   }    

   editarAlumno(alumno: Alumno){
    return this.http.put<Alumno>(`${this.api}/alumnos/${alumno.id}`,alumno);
   }    

   eliminarAlumno(alumno: Alumno){
    return this.http.delete<Alumno>(`${this.api}/alumnos/${alumno.id}`);
  }   


   grabarLocalStorage(){
    localStorage.setItem('TABLA_ALUMNOS', JSON.stringify(this.alumnos));    
  }       

  obtenerPromiseAlumnos(){
    this.alumnos = JSON.parse(localStorage.getItem('TABLA_ALUMNOS' ) || '[]') as Alumno[];  
    return new Promise((resolve, reject) => {
      if (this.alumnos.length > 0)
      {
        resolve(this.alumnos);
      }
      else
      {
        reject({
          codigo: 0,
          mensaje: "No hay Alumnos"
        });
      }
    } );
  }  

  obtenerAlumnoPorId(id: any)
  {
    return this.http.get<Alumno[]>(`${this.api}/alumnos/${id}`)
  }  

  // obtenerAlumnoPorId(id: any)
  // {
  //   this.alumnos = JSON.parse(localStorage.getItem('TABLA_ALUMNOS' ) || '[]') as Alumno[];  
  //   const item = this.alumnos.find(alumno => alumno.id == id);            
  //   const index = this.alumnos.indexOf(item!);
  //   return this.alumnos[index];
  // }  


}
