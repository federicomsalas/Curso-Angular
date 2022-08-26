import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../../../../models/curso';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';
import { EditarCursoComponent } from '../editar-curso/editar-curso.component';
import { BorrarCursoComponent } from '../borrar-curso/borrar-curso.component';
import { UtilsService } from '../../../../shared/utils/utils.service';


let ELEMENT_DATA_CURSOS: Curso[] = [];

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css','../../../../shared/css/content.css']
})
export class CursosComponent implements OnInit {

  columnas: string[] = ['descripcion', 'profesor','cargaHoraria','acciones'];
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource(ELEMENT_DATA_CURSOS);
  @ViewChild (MatTable) tabla!: MatTable<Curso>;

  constructor(
    private dialog: MatDialog,
    private cursosService: CursosService,
    private utilsService: UtilsService
  ) { 

    this.cursosService.obtenerObservableCursos().subscribe((cursos) => 
    {
      ELEMENT_DATA_CURSOS = cursos;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA_CURSOS); 
    });    

  }

  ngOnInit(): void {
  }


  agregarCurso(){

    const curso: Curso = {id: this.utilsService.makeid(), descripcion: '', profesor: '', cargaHoraria: ''};

    const dialogRef = this.dialog.open(EditarCursoComponent, {
      width: 'auto',
      data: {curso, modo: 'Alta'}
    })

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {
        this.cursosService.agregarCurso(resultado);          
        this.tabla.renderRows();       
      }
    })    

  }

  editar(curso: Curso){    
    const dialogRef = this.dialog.open(EditarCursoComponent, {
       width: 'auto',
       data: {curso, modo: 'Modificación'}      
     })
 
     dialogRef.afterClosed().subscribe(resultado => {
       if (resultado)
       {
        this.cursosService.editarCurso(resultado);        
         this.tabla.renderRows();
       }
     })    
 
   }

  eliminar(elemento: Curso){

    const dialogRef = this.dialog.open(BorrarCursoComponent, {
      width: 'auto',
      data: elemento 
    })

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado)
      {
       this.cursosService.eliminarCurso(elemento);        
       this.tabla.renderRows();
      }
    })    
  }

 

}
