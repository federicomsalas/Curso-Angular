import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formulario:  FormGroup;

  constructor( 
    private fb: FormBuilder
    )
  {
    this.formulario = fb.group({
      nombre: new FormControl(''),
      correo: new FormControl(''),
      mensaje: new FormControl('')
    })
  }
  
  enviarContacto(){
  console.log(this.formulario);
  }

}
