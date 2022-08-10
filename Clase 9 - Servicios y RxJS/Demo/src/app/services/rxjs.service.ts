import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  private observableProfesores: Observable<any>;


  constructor() {

    this.observableProfesores = new Observable<any>((suscriptor) => {
      suscriptor.next([
        {nombre: 'Fede', apellido: 'Salas'}
      ]);

      suscriptor.next([
        {nombre: 'Fede2', apellido: 'Salas2'}
      ]);      

      setTimeout(() => {
        suscriptor.next([
          {nombre: 'Fede3', apellido: 'Salas3'}
        ]);   
      },5000);

      
      suscriptor.error('Error');    
      
      suscriptor.complete();


    });    
   }

   obtenerProfesores()
   {
    return this.observableProfesores;
   }

   agregarProfesor()
   {

   }
   
}
