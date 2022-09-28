import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../../cursos/services/cursos.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Curso } from '../../../../models/curso';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../models/alumno';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../../auth/services/auth.service';
import { Usuario } from '../../../../models/usuario';

@Component({
  selector: 'app-editar-inscripcion',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css']
})
export class ListaInscripcionesComponent implements OnInit {
  formulario: FormGroup;
  cursos$!: Observable<Curso[]>;
  sesion$!: Observable<Usuario>;

  constructor( 

    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ListaInscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursosService: CursosService,


  ) {
      dialogRef.disableClose = true;    
      this.formulario = fb.group(
        {
          curso: new FormControl('', Validators.required)      
        }
      )

   }

  ngOnInit(): void {
    this.cursos$ = this.cursosService.obtenerCursos();
  }

  aceptar(){
    this.dialogRef.close(this.formulario.value);
  }

  cerrar(){
    this.dialogRef.close();
  }

}