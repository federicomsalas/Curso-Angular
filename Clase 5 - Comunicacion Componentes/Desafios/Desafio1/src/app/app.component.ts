import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Desafio1';

  obtenerMensaje(datos:any)
  {
    this.title = datos.mensaje;
    console.log(datos);
  }
}
