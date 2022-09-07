import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  formulario: FormGroup;


  constructor( 

    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
      //dialogRef.disableClose = true;    
      this.formulario = fb.group(
        {
          id: new FormControl(data.usuario.id),
          usuario: new FormControl(data.usuario.usuario, Validators.required),
          contrasena: new FormControl(data.usuario.contrasena, Validators.required),
          admin: new FormControl(data.usuario.admin, Validators.required),
          nombre: new FormControl(data.usuario.nombre, Validators.required),
          apellido: new FormControl(data.usuario.apellido, Validators.required),
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