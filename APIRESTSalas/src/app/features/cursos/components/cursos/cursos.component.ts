import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../../../../models/curso';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';
import { EditarCursoComponent } from '../editar-curso/editar-curso.component';
import { BorrarCursoComponent } from '../borrar-curso/borrar-curso.component';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { Observable } from 'rxjs';


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
  cursos$!: Observable<Curso[]>;

  constructor(
    private dialog: MatDialog,
    private cursosService: CursosService,
    private utilsService: UtilsService
  ) { 

  }

  ngOnInit(): void {
    this.cursos$ = this.cursosService.obtenerCursos()
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
        this.cursosService.agregarCurso(resultado).subscribe((curso: Curso) => {        
          this.ngOnInit();
        });   
      }
    })    

  }

  editar(curso: Curso){    
    const dialogRef = this.dialog.open(EditarCursoComponent, {
       width: 'auto',
       data: {curso, modo: 'Modificación'}      
     })
 
     dialogRef.afterClosed().subscribe(resultado => {
      {
        this.cursosService.editarCurso(resultado).subscribe((curso: Curso) => {        
          this.ngOnInit();
        });        
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
        this.cursosService.eliminarCurso(elemento).subscribe((curso: Curso) => {        
          this.ngOnInit();
        });        
      }
    })    
  }

 

}
