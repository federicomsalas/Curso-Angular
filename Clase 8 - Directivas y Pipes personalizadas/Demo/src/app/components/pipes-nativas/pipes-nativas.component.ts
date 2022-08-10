import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes-nativas',
  templateUrl: './pipes-nativas.component.html',
  styleUrls: ['./pipes-nativas.component.css']
})
export class PipesNativasComponent implements OnInit {

  datos: any  = {
    fecha: new Date(),
    texto: 'Texto de prueba',
    monto: 2218.2,
    porcentaje: 0.15  
  }

  constructor() { }

  ngOnInit(): void {
  }

}
