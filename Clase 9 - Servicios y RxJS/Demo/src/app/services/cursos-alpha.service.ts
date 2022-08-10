import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosAlphaService {

  constructor() { }

  obtenerCursos(){
    return [
      {id: 1, nombre: 'Angular exp', comision: '32310'},
      {id: 2, nombre: 'C# exp', comision: '32320'},
      {id: 3, nombre: 'SQL exp', comision: '32330'}
    ]
  }

}
