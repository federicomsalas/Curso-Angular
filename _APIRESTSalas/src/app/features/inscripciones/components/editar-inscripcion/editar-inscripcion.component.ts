import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../../cursos/services/cursos.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';

@Component({
  selector: 'app-editar-inscripcion',
  templateUrl: './editar-inscripcion.component.html',
  styleUrls: ['./editar-inscripcion.component.css']
})
export class EditarInscripcionComponent implements OnInit {
  formulario: FormGroup;
  listaCursos: any = [];
  listaAlumnos: any = [];

  constructor( 

    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarInscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursosService: CursosService,
    private alumnosService: AlumnosService

  ) {
      dialogRef.disableClose = true;    
      this.formulario = fb.group(
        {
          id: new FormControl(data.inscripcion.id),
          curso: new FormControl('', Validators.required),
          alumno: new FormControl('', Validators.required)          
        }
      )

   }

  ngOnInit(): void {

    this.cursosService.obtenerPromiseCursos()
    .then(
      (cursos) => {        
        this.listaCursos = cursos;
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    )

    this.alumnosService.obtenerPromiseAlumnos()
    .then(
      (alumnos) => {        
        this.listaAlumnos = alumnos;
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    )    

  }

  actualizar(){
    this.dialogRef.close(this.formulario.value);
  }

  cerrar(){
    this.dialogRef.close();
  }

}