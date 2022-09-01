import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../../../models/alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { BorrarAlumnoComponent } from '../borrar-alumno/borrar-alumno.component';
import { EditarAlumnoComponent } from '../editar-alumno/editar-alumno.component';
import { UtilsService } from '../../../../shared/utils/utils.service';



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

  constructor(
    private dialog: MatDialog,
    private alumnosService: AlumnosService,
    private utilsService: UtilsService
  ) { 

    this.alumnosService.obtenerObservableAlumnos().subscribe((alumnos) => 
    {
      ELEMENT_DATA = alumnos;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA); 
    });    

    /*
    ELEMENT_DATA = JSON.parse(localStorage.getItem('TABLA_ALUMNOS' ) || '[]') as Alumno[];          
    this.dataSource = new MatTableDataSource(ELEMENT_DATA); */
    

  }

  ngOnInit(): void {
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
        this.alumnosService.agregarAlumno(resultado);          
        this.tabla.renderRows();       
      }
    })    

  }

  editar(alumno: Alumno){    
    const dialogRef = this.dialog.open(EditarAlumnoComponent, {
       width: 'auto',
       data: {alumno, modo: 'Modificación'}      
     })
 
     dialogRef.afterClosed().subscribe(resultado => {
       if (resultado)
       {
        this.alumnosService.editarAlumno(resultado);        
         this.tabla.renderRows();
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
       this.alumnosService.eliminarAlumno(elemento);        
       this.tabla.renderRows();
      }
    })    
  }



}
