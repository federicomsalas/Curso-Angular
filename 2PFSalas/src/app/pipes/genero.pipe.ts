import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {

  transform(value: string): string {

    switch(value) { 
      case "0": { 
         return "woman";
         break; 
      } 
      case "1": { 
        return "man";
        break; 
      } 
      case "2": { 
        return "question_mark";
        break; 
      } 
    }
   return "";
  }
}
