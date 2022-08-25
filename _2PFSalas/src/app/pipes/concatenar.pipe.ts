import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../features/alumnos/components/alumnos/alumnos.component';


@Pipe({
  name: 'concatenar'
})
export class ConcatenarPipe implements PipeTransform {

  transform(value: Alumno): string {
      return value.apellido + ", " + value.nombre;    
  }

}
