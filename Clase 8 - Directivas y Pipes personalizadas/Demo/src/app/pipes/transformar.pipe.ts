import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformar'
})
export class TransformarPipe implements PipeTransform {

  meses: string[] = [
    'Enero', 'Febrero','Marzo', 'Abril','Mayo', 'Junio','Julio', 'Agosto','Septiembre', 'Octubre','Noviembre', 'Diciembre'
  ]

  transform(value: any, ... args: any[]): unknown {
    let resultado: string;
    const texto = args[0];
    console.log(value);
    console.log(args);
    
    resultado = "De " + this.meses[value.fechaInicio.getMonth()] + " a " + this.meses[value.fechaFin.getMonth()] ;
    if (texto === 'uppercase')
    {
      return resultado.toUpperCase();
    }
    else
    {
      return resultado;
    }
    
    
  }

}
