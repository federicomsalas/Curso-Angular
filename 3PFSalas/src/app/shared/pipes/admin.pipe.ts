import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'admin'
})
export class AdminPipe implements PipeTransform {

  transform(value: string): string {
        if (value == "0")
        {
            return "No";
        }
        else
        {
            return "Sí";
        }              
  }

}
