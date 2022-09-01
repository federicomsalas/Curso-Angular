import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-borrar-inscripcion',
  templateUrl: './borrar-inscripcion.component.html',
  styleUrls: ['./borrar-inscripcion.component.css']
})
export class BorrarInscripcionComponent {
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<BorrarInscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
    
  ) {  }

  formControl = new FormControl('', [Validators.required]);

  getError() {
    return this.formControl.hasError('required') ? 'El campo es requerido' : '';
  }

  borrar(){
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
