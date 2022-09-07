import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {
  formulario: FormGroup;


  constructor( 

    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
      dialogRef.disableClose = true;    
      this.formulario = fb.group(
        {
          id: new FormControl(data.curso.id),
          descripcion: new FormControl(data.curso.descripcion, Validators.required),
          profesor: new FormControl(data.curso.profesor, Validators.required),
          cargaHoraria: new FormControl(data.curso.cargaHoraria, [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1)])
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