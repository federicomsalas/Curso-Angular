import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor() { }

  obtenerAlumnos(){
    return [
      {id:1, nombre: 'Fede', apellido:'Salas'},
      {id:2, nombre: 'Prueba', apellido:'Test'}
    ];
  }

}
