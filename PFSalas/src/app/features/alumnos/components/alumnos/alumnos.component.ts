import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../../../models/alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { BorrarAlumnoComponent } from '../borrar-alumno/borrar-alumno.component';
import { EditarAlumnoComponent } from '../editar-alumno/editar-alumno.component';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { alumnosCargados, cargarAlumnos } from '../../state/alumnos.action';
import { selectorListaAlumnos, selectorCargandoAlumnos } from '../../state/alumnos.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleStrategy } from '@angular/router';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import { Inscripcion } from '../../../../models/inscripcion';
import { map } from 'rxjs/operators';

let ELEMENT_DATA: Alumno[] = [];

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css','../../../../shared/css/content.css']
})
export class AlumnosComponent implements OnInit {

  columnas: string[] = ['nombre', 'mail','edad','genero','acciones'];
  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild (MatTable) tabla!: MatTable<Alumno>;
  alumnos$!: Observable<Alumno[]>;
  alumnosSubscription!: Subscription;
  cargando$!: Observable<boolean>;
  usuario: any;


  constructor(
    private dialog: MatDialog,
    private alumnosService: AlumnosService,
    private utilsService: UtilsService,
    private store: Store,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('SESSION') || 'false');
    this.store.dispatch(cargarAlumnos());
    this.alumnos$ = this.store.select(selectorListaAlumnos);
    this.cargando$ = this.store.select(selectorCargandoAlumnos);        
    this.alumnosSubscription = this.alumnosService.alumnoSubject.subscribe(
      (data) => {
        this.store.dispatch(alumnosCargados({ alumnos: data }));
      }
    );
  }  


  agregarAlumno(){

    const alumno: Alumno = {id: this.utilsService.makeid() ,nombre: '', apellido: '', mail: '', edad: '', genero: ''};

    const dialogRef = this.dialog.open(EditarAlumnoComponent, {
      width: 'auto',
      data: {alumno, modo: 'Alta'}
    })

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {
        this.alumnosService.agregarAlumno(resultado).subscribe((alumno: Alumno) => {        
          this.store.dispatch(cargarAlumnos());
          this.snackBar.open(alumno.apellido +  ', ' + alumno.nombre +   " fue agregado correctamente", "Ok", {duration: 2000});
        });                 
      }
    })    

  }

  editar(alumno: Alumno){ 
    


    let modo = "";
    if (this.usuario.admin == 0) 
    {
     modo = "Visualización";
    }
    else{
     modo = "Modificación"
    }       

    const dialogRef = this.dialog.open(EditarAlumnoComponent, {
       width: 'auto',
       data: {alumno, modo: modo}      
     })
 
     dialogRef.afterClosed().subscribe(resultado => {
       if (resultado)
       {
        this.alumnosService.editarAlumno(resultado).subscribe((alumno: Alumno) => {        
          this.store.dispatch(cargarAlumnos());
          this.snackBar.open(alumno.apellido +  ', ' + alumno.nombre +   " fue editado correctamente", "Ok", {duration: 2000});
        });            
       }
     })    
 
   }
   

  eliminar(elemento: Alumno){


    const dialogRef = this.dialog.open(BorrarAlumnoComponent, {
      width: 'auto',
      data: elemento 
    })

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {
       this.alumnosService.eliminarAlumno(elemento).subscribe((alumno: Alumno) => {        
        this.store.dispatch(cargarAlumnos());
        this.snackBar.open(alumno.apellido +  ', ' + alumno.nombre +   " fue eliminado correctamente", "Ok", {duration: 2000});
      });            
      }
    })    
  }



}
