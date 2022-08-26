import { Injectable } from '@angular/core';
import { Inscripcion } from '../../../models/inscripcion';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../cursos/services/cursos.service';
import { AlumnosService } from '../../alumnos/services/alumnos.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  inscripciones: Inscripcion[] = [];
  observableInscripciones: Observable<any>;
  inscripcionesSubject: Subject<any>;

  constructor(
    private dialog: MatDialog,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
  ) {
    //localStorage.setItem('TABLA_INSCRIPCIONES', '[]');    
    this.inscripcionesSubject = new Subject();
    this.observableInscripciones = new Observable<any>((suscriptor) =>
      {
        this.inscripciones = JSON.parse(localStorage.getItem('TABLA_INSCRIPCIONES' ) || '[]') as Inscripcion[];  
        suscriptor.next(this.inscripciones);
      }
     )   
   }


   obtenerObservableInscripciones(){
    return this.observableInscripciones;
  }

  agregarInscripcion(inscripcion: Inscripcion){
    inscripcion.curso = this.cursosService.obtenerCursoPorId(inscripcion.curso);
    inscripcion.alumno = this.alumnosService.obtenerAlumnoPorId(inscripcion.alumno);
    this.inscripciones.push(inscripcion);
    this.grabarLocalStorage(); 
    this.inscripcionesSubject.next(this.inscripciones);
   }    

   validarCursoNoInscripto(id: string): boolean
   {
    this.inscripciones = JSON.parse(localStorage.getItem('TABLA_INSCRIPCIONES' ) || '[]') as Inscripcion[];  
    const item = this.inscripciones.find(inscripcion => inscripcion.curso.id == id);        
    const index = this.inscripciones.indexOf(item!);   
    if (index >= 0)
    {
      alert("No se puede borrar el curso porque ya hay alumnos inscriptos en él.");
      return false;
    } 
    else
    {
      return true;
    }
   }
 


   eliminarInscripcion(elemento: Inscripcion){
    const item = this.inscripciones.find(alumno => alumno.id == elemento.id);        
    const index = this.inscripciones.indexOf(item!);
    this.inscripciones.splice(index,1);
    this.grabarLocalStorage();
    this.inscripcionesSubject.next(this.inscripciones);
  }   

   grabarLocalStorage(){
    localStorage.setItem('TABLA_INSCRIPCIONES', JSON.stringify(this.inscripciones));    
  }       



}
