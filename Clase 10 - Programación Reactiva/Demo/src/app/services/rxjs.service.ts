import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {
  profesores: any[] = [
    {id: 1, nombre: "Fede", curso: "Angular"},
    {id: 2, nombre: "Fede", curso: "Angular"},
    {id: 3, nombre: "Fede", curso: "Angular"}
  ];

  alumnos: any = [
    {id: 1, nombre: "Fede", curso: "Angular"},
    {id: 2, nombre: "Fede", curso: "Angular"},
    {id: 3, nombre: "Fede", curso: "TEST"},
    {id: 4, nombre: "Fede", curso: "Angular"},
    {id: 5, nombre: "Fede", curso: "OTRO"}
  ];

  constructor() {
    this.cursosSubject = new Subject();

    this.profesoresObservable = new Observable<any>((suscriptor) =>
      {
        suscriptor.next(this.profesores);

        setTimeout(() => { 
        this.profesores.push({id: 4, nombre: "Test", curso:"Ang"});
        suscriptor.next(this.profesores) }, 3000) 
      }
     )
   }

  profesoresObservable: Observable<any>;
  cursos: any[] = [];
  cursosSubject: Subject<any>;


  obtenerPromiseProfesores(){
    return new Promise((resolve, reject) => {
      if (this.profesores.length > 0)
      {
        resolve(this.profesores);
      }
      else
      {
        reject({
          codigo: 0,
          mensaje: "No hay profesores"
        });
      }
    } );
  }

  obtenerObservableProfesores(){
    return this.profesoresObservable;
  }

  agregarNuevoProfesor(profesor: any){
   /*this.profesores.push(profesor);
   console.log(this.profesores);*/
    
  }

  agregarNuevoCurso(curso: any){
    /*this.profesores.push(profesor);
    console.log(this.profesores);*/
     this.cursos.push(curso);
     this.cursosSubject.next(this.cursos);
     console.log(this.cursos);
   }  

   obtenerObservableCursos(){
    return this.cursosSubject.asObservable();
   }

   obtenerObservableAlumnos()
   {
    return of(this.alumnos);
   }

}
