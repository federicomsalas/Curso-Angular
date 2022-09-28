import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../../cursos/services/cursos.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Curso } from '../../../../models/curso';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../models/alumno';

@Component({
  selector: 'app-editar-inscripcion',
  templateUrl: './editar-inscripcion.component.html',
  styleUrls: ['./editar-inscripcion.component.css']
})
export class EditarInscripcionComponent implements OnInit {
  formulario: FormGroup;
  listaCursos: any = [];
  listaAlumnos: any = [];
  cursos$!: Observable<Curso[]>;
  alumnos$!: Observable<Alumno[]>;

  constructor( 

    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarInscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,


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

    this.cursos$ = this.cursosService.obtenerCursos();

    this.alumnos$ = this.alumnosService.obtenerAlumnos();

  }

  actualizar(){
    this.dialogRef.close(this.formulario.value);
  }

  cerrar(){
    this.dialogRef.close();
  }

}