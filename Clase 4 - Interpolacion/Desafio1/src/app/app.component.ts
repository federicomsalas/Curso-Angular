import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre = "Federico Salas";
  familiares= [{
    nombre: 'Fede',
    apellido: 'Salas'
  },
  {
    nombre: 'Edu',
    apellido: 'Riccillo'
  }
  ,
  {
    nombre: 'Juan',
    apellido: 'Torres'
  }    
];
contenido1: string = "Este es párrafo 1";
contenido2: string = "Este es párrafo 2";

}
