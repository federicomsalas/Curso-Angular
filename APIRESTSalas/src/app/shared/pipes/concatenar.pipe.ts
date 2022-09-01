import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../../models/alumno';

@Pipe({
  name: 'concatenar'
})
export class ConcatenarPipe implements PipeTransform {

  transform(value: Alumno): string {
      return value.apellido + ", " + value.nombre;    
  }

}
