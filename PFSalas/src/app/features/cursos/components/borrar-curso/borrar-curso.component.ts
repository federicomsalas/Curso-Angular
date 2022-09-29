import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';

@Component({
  selector: 'app-borrar-curso',
  templateUrl: './borrar-curso.component.html',
  styleUrls: ['./borrar-curso.component.css']
})
export class BorrarCursoComponent {
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<BorrarCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private inscripcionesService: InscripcionesService
    
  ) {  }

  formControl = new FormControl('', [Validators.required]);

  getError() {
    return this.formControl.hasError('required') ? 'El campo es requerido' : '';
  }

  borrar(){      
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

