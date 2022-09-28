import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../models/alumno';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editar-inscripcion',
  templateUrl: './lista-inscripciones-cursos.component.html',
  styleUrls: ['./lista-inscripciones-cursos.component.css']
})
export class ListaInscripcionesCursosComponent implements OnInit {
  formulario: FormGroup;  
  alumnos$!: Observable<Alumno[]>;

  constructor( 

    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ListaInscripcionesCursosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnosService: AlumnosService,


  ) {
      dialogRef.disableClose = true;    
      this.formulario = fb.group(
        {
          alumno: new FormControl('', Validators.required)      
        }
      )

   }

  ngOnInit(): void {
    this.alumnos$ = this.alumnosService.obtenerAlumnos().pipe(
    );
  }

  aceptar(){
    this.dialogRef.close(this.formulario.value);
  }

  cerrar(){
    this.dialogRef.close();
  }

}