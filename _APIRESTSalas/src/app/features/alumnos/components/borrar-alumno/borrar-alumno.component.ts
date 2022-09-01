import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-borrar-alumno',
  templateUrl: './borrar-alumno.component.html',
  styleUrls: ['./borrar-alumno.component.css']
})
export class BorrarAlumnoComponent  {
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<BorrarAlumnoComponent>,
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
