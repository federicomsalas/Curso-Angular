import { Injectable } from '@angular/core';
import { Curso } from '../../../models/curso';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  cursos: Curso[] = [];
  observableCursos: Observable<any>;
  cursosSubject: Subject<any>;

  constructor(
    private dialog: MatDialog
  ) {
    
    this.cursosSubject = new Subject();
    this.observableCursos = new Observable<any>((suscriptor) =>
      {
        this.cursos = JSON.parse(localStorage.getItem('TABLA_CURSOS' ) || '[]') as Curso[];  
        suscriptor.next(this.cursos);
      }
     )   
   }


   obtenerObservableCursos(){
    return this.observableCursos;
  }

  agregarCurso(curso: Curso){
    this.cursos.push(curso);
    this.grabarLocalStorage(); 
    this.cursosSubject.next(this.cursos);
   }    

   editarCurso(elemento: Curso){
    const item = this.cursos.find(curso => curso.id == elemento.id);        
    const index = this.cursos.indexOf(item!);
    this.cursos[index] = elemento;
    this.grabarLocalStorage(); 
    this.cursosSubject.next(this.cursos);
   }    

   eliminarCurso(elemento: Curso){
    const item = this.cursos.find(alumno => alumno.id == elemento.id);        
    const index = this.cursos.indexOf(item!);
    this.cursos.splice(index,1);
    this.grabarLocalStorage();
    this.cursosSubject.next(this.cursos);
  }   

   grabarLocalStorage(){
    localStorage.setItem('TABLA_CURSOS', JSON.stringify(this.cursos));    
  }     
  
  obtenerCursoPorId(id: any)
  {
    this.cursos = JSON.parse(localStorage.getItem('TABLA_CURSOS' ) || '[]') as Curso[];  
    const item = this.cursos.find(curso => curso.id == id);            
    const index = this.cursos.indexOf(item!);
    return this.cursos[index];
  }

  obtenerPromiseCursos(){
    this.cursos = JSON.parse(localStorage.getItem('TABLA_CURSOS' ) || '[]') as Curso[];  
    return new Promise((resolve, reject) => {
      if (this.cursos.length > 0)
      {
        resolve(this.cursos);
      }
      else
      {
        reject({
          codigo: 0,
          mensaje: "No hay Cursos"
        });
      }
    } );
  }  

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }    


}
