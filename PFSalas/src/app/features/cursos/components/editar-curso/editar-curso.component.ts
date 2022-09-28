import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inscripcion } from '../../../../models/inscripcion';
import { Observable } from 'rxjs';
import { CursosService } from '../../services/cursos.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Curso } from '../../../../models/curso';
import { ListaInscripcionesComponent } from '../../../inscripciones/components/lista-inscripciones/lista-inscripciones.component';
import { ListaInscripcionesCursosComponent } from '../../../inscripciones/components/lista-inscripciones-cursos/lista-inscripciones-cursos.component';
import { BorrarInscripcionComponent } from '../../../inscripciones/components/borrar-inscripcion/borrar-inscripcion.component';
import { Alumno } from '../../../../models/alumno';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css','../../../../shared/css/content.css']
})
export class EditarCursoComponent implements OnInit {
  formulario: FormGroup;
  inscripciones$!: Observable<Inscripcion[]>;
  columnas: string[] = [];
  curso!: Curso;  
  usuario: any;
  cantidadRegistros: any;

  constructor( 
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursosService : CursosService,
    private alumnosService : AlumnosService,
    private inscripcionesService : InscripcionesService,
    private utilsService : UtilsService,
    private snackBar : MatSnackBar       

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

      this.usuario = JSON.parse(localStorage.getItem('SESSION') || 'false');
      if (this.usuario.admin > 0)
      {this.columnas = ['nombre','acciones'];} else {this.columnas = ['nombre'];}

      this.curso = data.curso;


   }

  ngOnInit(): void {    
    this.inscripciones$ = this.inscripcionesService.obtenerInscripciones().pipe(
      map((inscripciones: Inscripcion[]) => {
        return inscripciones.filter(
          (i) => i.curso.id == this.curso.id
        );
      })
    );      
    this.inscripciones$.subscribe(result => {return this.cantidadRegistros =  result.length});         

  }

  inscribir(){

    const dialogRef = this.dialog.open(ListaInscripcionesCursosComponent, {
      width: 'auto',
      data: {curso : this.curso, inscripciones : this.inscripciones$}
    })


    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {

        this.cursosService.obtenerCursoPorId(this.curso.id).subscribe((curso: Curso[]) => {                  
          resultado.curso = curso;          

          this.alumnosService.obtenerAlumnoPorId(resultado.alumno).subscribe((alumno: Alumno[]) => {                  
            resultado.alumno = alumno;

            resultado.id = this.utilsService.makeid();

            this.inscripcionesService.agregarInscripcion(resultado).subscribe((resultado: Inscripcion) => {        
              this.ngOnInit();
            }); 
            this.snackBar.open(resultado.alumno.apellido +  ', ' + resultado.alumno.nombre +   " se inscribió correctamente a " +  this.curso.descripcion, "Ok", {duration: 2000});
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
      }); 
      this.snackBar.open(elemento.alumno.apellido +  ', ' + elemento.alumno.nombre +   " se borró del curso " +  this.curso.descripcion, "Ok", {duration: 2000}); 
      }
    })    
  }    

  actualizar(){
    this.dialogRef.close(this.formulario.value);
  }

  cerrar(){
    this.dialogRef.close();
  }

}