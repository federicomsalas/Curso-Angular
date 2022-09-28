import { Injectable } from '@angular/core';
import { Inscripcion } from '../../../models/inscripcion';
import { Observable, Subject, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../cursos/services/cursos.service';
import { AlumnosService } from '../../alumnos/services/alumnos.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  inscripciones: Inscripcion[] = [];
  private api=  environment.API

  constructor(
    private dialog: MatDialog,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private http: HttpClient,
    
  ) {  
   }


   obtenerInscripciones(): Observable<Inscripcion[]>{
    return this.http.get<Inscripcion[]>(`${this.api}/inscripciones`)
  }   

  agregarInscripcion(inscripcion: Inscripcion){

    return this.http.post<Inscripcion>(`${this.api}/inscripciones`, inscripcion);
    
   }    

   eliminarInscripcion(inscripcion: Inscripcion){
    return this.http.delete<Inscripcion>(`${this.api}/inscripciones/${inscripcion.id}`);
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
 



}
