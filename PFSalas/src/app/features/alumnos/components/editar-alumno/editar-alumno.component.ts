import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../../cursos/services/cursos.service';
import { AlumnosService } from '../../services/alumnos.service';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inscripcion } from '../../../../models/inscripcion';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../models/alumno';
import { map, filter } from 'rxjs/operators';
import { ListaInscripcionesComponent } from '../../../inscripciones/components/lista-inscripciones/lista-inscripciones.component';
import { Curso } from '../../../../models/curso';
import { BorrarInscripcionComponent } from '../../../inscripciones/components/borrar-inscripcion/borrar-inscripcion.component';


@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css','../../../../shared/css/content.css']
})
export class EditarAlumnoComponent implements OnInit {
  formulario: FormGroup;
  inscripciones$!: Observable<Inscripcion[]>;
  columnas: string[] = [];
  alumno!: Alumno;  
  usuario: any;
  cantidadRegistros: any;

  constructor( 
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private cursosService : CursosService,
    private alumnosService : AlumnosService,
    private inscripcionesService : InscripcionesService,
    private utilsService : UtilsService,
    private snackBar : MatSnackBar    

  ) {
    this.usuario = JSON.parse(localStorage.getItem('SESSION') || 'false');
      dialogRef.disableClose = true;    
      this.formulario = fb.group(
        {
          id: new FormControl(data.alumno.id),
          nombre: new FormControl(data.alumno.nombre, Validators.required),
          apellido: new FormControl(data.alumno.apellido, Validators.required),
          edad: new FormControl(data.alumno.edad, [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1)]),
          mail: new FormControl(data.alumno.mail, [Validators.required, Validators.email]),
          genero: new FormControl({value: data.alumno.genero, disabled: this.usuario.admin == 0}, Validators.required)
        }
      )

      
      if (this.usuario.admin > 0)
      {this.columnas = ['descripcion','acciones'];} else {this.columnas = ['descripcion'];}

      this.alumno = data.alumno;

   }

  ngOnInit(): void {
    
    this.inscripciones$ = this.inscripcionesService.obtenerInscripciones().pipe(
      map((inscripciones: Inscripcion[]) => {
        return inscripciones.filter(
          (i) => i.alumno.id == this.alumno.id
        );
      })
    );    
    this.inscripciones$.subscribe(result => {return this.cantidadRegistros =  result.length});      
  }

  actualizar(){
    this.dialogRef.close(this.formulario.value);
  }

  inscribir(){

    const dialogRef = this.dialog.open(ListaInscripcionesComponent, {
      width: 'auto',
      data: {alumno : this.alumno, inscripciones : this.inscripciones$}
    })


    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {

        this.cursosService.obtenerCursoPorId(resultado.curso).subscribe((curso: Curso[]) => {                  
          resultado.curso = curso;          

          this.alumnosService.obtenerAlumnoPorId(this.alumno.id).subscribe((alumno: Alumno[]) => {                  
            resultado.alumno = alumno;

            resultado.id = this.utilsService.makeid();

            this.inscripcionesService.agregarInscripcion(resultado).subscribe((resultado: Inscripcion) => {        
              this.ngOnInit();
            }); 
            this.snackBar.open(this.alumno.apellido +  ', ' + this.alumno.nombre +   " se inscribió correctamente a " +  resultado.curso.descripcion, "Ok", {duration: 2000});
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
      this.snackBar.open(this.alumno.apellido +  ', ' + this.alumno.nombre +   " se borró del curso " +  elemento.curso.descripcion, "Ok", {duration: 2000}); 
      }
    })    
  }  

  cerrar(){
    this.dialogRef.close();
  }

}