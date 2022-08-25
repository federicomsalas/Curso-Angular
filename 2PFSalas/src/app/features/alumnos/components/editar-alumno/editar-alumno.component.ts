import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {
  formulario: FormGroup;


  constructor( 

    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarAlumnoComponent>,
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