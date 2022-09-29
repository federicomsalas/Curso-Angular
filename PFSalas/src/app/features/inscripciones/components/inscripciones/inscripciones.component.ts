import { Component, OnInit, ViewChild } from '@angular/core';
import { EditarInscripcionComponent } from '../editar-inscripcion/editar-inscripcion.component';
import { Inscripcion } from '../../../../models/inscripcion';
import {  MatTable } from '@angular/material/table';
import { InscripcionesService } from '../../services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { BorrarInscripcionComponent } from '../borrar-inscripcion/borrar-inscripcion.component';
import { Curso } from 'src/app/models/curso';
import { Alumno } from 'src/app/models/alumno';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { Observable, map, Subscription } from 'rxjs';
import { CursosService } from '../../../cursos/services/cursos.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css','../../../../shared/css/content.css']
})
export class InscripcionesComponent implements OnInit {

  columnas: string[] = [];
  inscripciones$!: Observable<Inscripcion[]>;
  usuario: any;
  
  constructor(
    private dialog: MatDialog,
    private inscripcionesService: InscripcionesService,
    private utilsService: UtilsService,
    private cursosService : CursosService,
    private alumnosService : AlumnosService,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {    
    this.usuario = JSON.parse(localStorage.getItem('SESSION') || 'false');
    if (this.usuario.admin > 0)
    {
      this.columnas = ['nombre', 'descripcion','acciones'];
    }
    else
    {
      this.columnas = ['nombre', 'descripcion'];
    }
    this.inscripciones$ = this.inscripcionesService.obtenerInscripciones();
    
  }



  agregarInscripcion(){

    const curso: Curso = {id: '', descripcion: '', profesor: '', cargaHoraria: ''};
    const alumno: Alumno = {id: '',nombre: '', apellido: '', mail: '', edad: '', genero: ''};
    const inscripcion: Inscripcion = {id: this.utilsService.makeid(), curso : curso , alumno : alumno };

    const dialogRef = this.dialog.open(EditarInscripcionComponent, {
      width: '400px',
      data: {inscripcion, modo: 'Alta'}
    })

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {
        this.cursosService.obtenerCursoPorId(resultado.curso).subscribe((curso: Curso[]) => {                  
          resultado.curso = curso;

          this.alumnosService.obtenerAlumnoPorId(resultado.alumno).subscribe((alumno: Alumno[]) => {                  
            resultado.alumno = alumno;

            this.inscripcionesService.agregarInscripcion(resultado).subscribe((resultado: Inscripcion) => {        
              this.ngOnInit();
              this.snackBar.open(resultado.alumno.apellido +  ', ' + resultado.alumno.nombre +   " se inscribió  al curso de" +  resultado.curso.descripcion, "Ok", {duration: 2000}); 
            }); 

          });   

        });             
      }
    })    

  }

  eliminar(elemento: Inscripcion){

    const dialogRef = this.dialog.open(BorrarInscripcionComponent, {
      width: 'auto',
      data: elemento 
    })

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {
       this.inscripcionesService.eliminarInscripcion(elemento).subscribe((inscripcion: Inscripcion) => {        
        this.ngOnInit();
        this.snackBar.open(elemento.alumno.apellido +  ', ' + elemento.alumno.nombre +   " se borró del curso " +  elemento.curso.descripcion, "Ok", {duration: 2000}); 
      });  
      }
    })    
  }



}
