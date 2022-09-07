import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../../../models/alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { BorrarAlumnoComponent } from '../borrar-alumno/borrar-alumno.component';
import { EditarAlumnoComponent } from '../editar-alumno/editar-alumno.component';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { Observable } from 'rxjs';



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

  constructor(
    private dialog: MatDialog,
    private alumnosService: AlumnosService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.alumnos$ = this.alumnosService.obtenerAlumnos()
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
          this.ngOnInit();
        });                 
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
        this.alumnosService.editarAlumno(resultado).subscribe((alumno: Alumno) => {        
          this.ngOnInit();
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
        this.ngOnInit();
      });            
      }
    })    
  }



}
