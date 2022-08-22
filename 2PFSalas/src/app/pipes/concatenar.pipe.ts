import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../components/content/content.component';

@Pipe({
  name: 'concatenar'
})
export class ConcatenarPipe implements PipeTransform {

  transform(value: Alumno): string {
      return value.apellido + ", " + value.nombre;    
  }

}
