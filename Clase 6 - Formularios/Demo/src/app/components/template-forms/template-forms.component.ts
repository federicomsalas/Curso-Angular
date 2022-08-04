import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Contacto } from '../../../models/Contacto';

@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.css']
})
export class TemplateFormsComponent implements OnInit {
  contactoModel: Contacto = {
    nombre: '',
    correo: '',
    mensaje: ''
  }

  @ViewChild('txtNombre') nombreInputRef!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }



  enviarContacto(): void {

    console.log(this.contactoModel);
    this.contactoModel.nombre = "CAMBIADO";
    /*const input: HTMLInputElement = this.nombreInputRef.nativeElement;
    input.value = 'Valor cambiado desde TS';*/
    console.log(this.contactoModel);

  }


}
