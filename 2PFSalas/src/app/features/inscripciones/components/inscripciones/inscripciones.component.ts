import { Component, OnInit, ViewChild } from '@angular/core';
import { EditarInscripcionComponent } from '../editar-inscripcion/editar-inscripcion.component';
import { Inscripcion } from '../../../../models/inscripcion';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { InscripcionesService } from '../../services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { BorrarInscripcionComponent } from '../borrar-inscripcion/borrar-inscripcion.component';
import { Curso } from 'src/app/models/curso';
import { Alumno } from 'src/app/models/alumno';
import { UtilsService } from '../../../../shared/utils/utils.service';


let ELEMENT_DATA_INSCRIPCIONES: Inscripcion[] = [];

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css','../../../../shared/css/content.css']
})
export class InscripcionesComponent implements OnInit {

  columnas: string[] = ['nombre', 'descripcion','acciones'];
  dataSource: MatTableDataSource<Inscripcion> = new MatTableDataSource(ELEMENT_DATA_INSCRIPCIONES);
  @ViewChild (MatTable) tabla!: MatTable<Inscripcion>;

  constructor(
    private dialog: MatDialog,
    private inscripcionesService: InscripcionesService,
    private utilsService: UtilsService
  ) { 

    this.inscripcionesService.obtenerObservableInscripciones().subscribe((inscripciones) => 
    {
      ELEMENT_DATA_INSCRIPCIONES = inscripciones;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA_INSCRIPCIONES);     
    });    

  }

  ngOnInit(): void {
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
        this.inscripcionesService.agregarInscripcion(resultado);            
        try{
          this.tabla.renderRows();       
        }
        catch
        {
          
        }        
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
       this.inscripcionesService.eliminarInscripcion(elemento);        
       this.tabla.renderRows();
      }
    })    
  }



}
