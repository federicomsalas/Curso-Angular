import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { Alumno } from '../../../models/alumno';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  alumnos: Alumno[] = [];
  observableAlumnos: Observable<any>;
  alumnosSubject: Subject<any>;

  constructor(
    private dialog: MatDialog
  ) {
    
    this.alumnosSubject = new Subject();
    this.observableAlumnos = new Observable<any>((suscriptor) =>
      {
        this.alumnos = JSON.parse(localStorage.getItem('TABLA_ALUMNOS' ) || '[]') as Alumno[];  
        suscriptor.next(this.alumnos);
      }
     )   
   }



   obtenerObservableAlumnos(){
    return this.observableAlumnos;
  }

  agregarAlumno(alumno: Alumno){
    this.alumnos.push(alumno);
    this.grabarLocalStorage(); 
    this.alumnosSubject.next(this.alumnos);
   }    

   editarAlumno(elemento: Alumno){
    const item = this.alumnos.find(alumno => alumno.id == elemento.id);        
    const index = this.alumnos.indexOf(item!);
    this.alumnos[index] = elemento;
    this.grabarLocalStorage(); 
    this.alumnosSubject.next(this.alumnos);
   }    

   eliminarAlumno(elemento: Alumno){
    const item = this.alumnos.find(alumno => alumno.id == elemento.id);        
    const index = this.alumnos.indexOf(item!);
    this.alumnos.splice(index,1);
    this.grabarLocalStorage();
    this.alumnosSubject.next(this.alumnos);
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
    this.alumnos = JSON.parse(localStorage.getItem('TABLA_ALUMNOS' ) || '[]') as Alumno[];  
    const item = this.alumnos.find(alumno => alumno.id == id);            
    const index = this.alumnos.indexOf(item!);
    return this.alumnos[index];
  }  


  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }    


}
