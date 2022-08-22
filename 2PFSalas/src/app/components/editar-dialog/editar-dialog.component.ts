import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from '../content/content.component';


@Component({
  selector: 'app-editar-dialog',
  templateUrl: './editar-dialog.component.html',
  styleUrls: ['./editar-dialog.component.css']
})
export class EditarDialogComponent implements OnInit {
  formulario: FormGroup;


  constructor( 

    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
      dialogRef.disableClose = true;    
      this.formulario = fb.group(
        {
          id: new FormControl(data.alumno.id),
          nombre: new FormControl(data.alumno.nombre, Validators.required),
          apellido: new FormControl(data.alumno.apellido, Validators.required),
          edad: new FormControl(data.alumno.edad, [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1)]),
          mail: new FormControl(data.alumno.mail, [Validators.required, Validators.email]),
          genero: new FormControl(data.alumno.genero, Validators.required)
        }
      )

   }

  ngOnInit(): void {
  }

  actualizar(){
    this.dialogRef.close(this.formulario.value);
  }

  cerrar(){
    this.dialogRef.close();
  }

}