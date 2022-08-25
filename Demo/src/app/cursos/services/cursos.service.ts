import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }

  obtenerCursos(){
    return [
      {id: 1, nombre: 'Fede', comision: '1234'},
      {id: 2, nombre: 'Fede', comision: '45'},
      {id: 3, nombre: 'Fede', comision: '1'},
      {id: 4, nombre: 'Fede', comision: '1'},
      {id: 5, nombre: 'Fede', comision: '31234'},
      {id: 6, nombre: 'Fede', comision: '2'},
      {id: 7, nombre: 'Fede', comision: '5'},
    ]
  }
}
