import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directivas',
  templateUrl: './directivas.component.html',
  styleUrls: ['./directivas.component.css']
})
export class DirectivasComponent implements OnInit {

  variable1: number = 10;
  variable2: string = "Federic";
  arreglo: string[] = ['Item 1 ngFor','Item 2 ngFor','Item 3 ngFor'];
  familiares= [{
    nombre: 'Fede',
    apellido: 'Salas'
  },  {    nombre: 'Edu',
    apellido: 'Riccillo'
  }  ,
  {    nombre: 'Juan',
    apellido: 'Torres'
  }];
ahora = Date.now;

  constructor() { }

  ngOnInit(): void {
  }
  cambiarVariable1(): void{
    this.variable1 = Math.round(Math.random()*10);
  }

}
