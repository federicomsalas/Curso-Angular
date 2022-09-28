import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../../../../models/curso';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';
import { EditarCursoComponent } from '../editar-curso/editar-curso.component';
import { BorrarCursoComponent } from '../borrar-curso/borrar-curso.component';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { Observable, Subscription } from 'rxjs';
import { selectorListaCursos } from '../../state/cursos.selector';
import { cargarCursos, cursosCargados } from '../../state/cursos.actions';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import { map } from 'rxjs/operators';
import { Inscripcion } from '../../../../models/inscripcion';


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
  cursosSubscription!: Subscription;
  usuario: any;

  constructor(
    private dialog: MatDialog,
    private cursosService: CursosService,
    private utilsService: UtilsService,
    private store: Store,
    private snackBar: MatSnackBar,
    private inscripcionesService: InscripcionesService
  ) { 

  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('SESSION') || 'false');
    this.store.dispatch(cargarCursos());
    this.cursos$ = this.store.select(selectorListaCursos);
    this.cursosSubscription = this.cursosService.cursoSubject.subscribe(
      (data) => {
        this.store.dispatch(cursosCargados({ cursos: data }));
      }
    );
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
          this.store.dispatch(cargarCursos());
          this.snackBar.open(curso.descripcion + " fue agregado correctamente", "Ok", {duration: 2000});
        });   
      }
    })    

  }

  editar(curso: Curso){    

    let inscripciones$!: Observable<Inscripcion[]>;
    inscripciones$ = this.inscripcionesService.obtenerInscripciones().pipe(
      map((inscripciones: Inscripcion[]) => {
        return inscripciones.filter(
          (i) => i.curso.id == curso.id
        );
      })
    );    

    let modo = "";
    if (this.usuario.admin == 0) 
    {
     modo = "Visualización";
    }
    else{
     modo = "Modificación"
    }    

    const dialogRef = this.dialog.open(EditarCursoComponent, {
       width: 'auto',
       data: {curso, modo: modo}      
     })
 
     dialogRef.afterClosed().subscribe(resultado => {
      {
        if (resultado)
        {
        this.cursosService.editarCurso(resultado).subscribe((curso: Curso) => {        
          this.store.dispatch(cargarCursos());
          this.snackBar.open(curso.descripcion + " fue editado correctamente", "Ok", {duration: 2000});
        });        
      }
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
          this.store.dispatch(cargarCursos());
          this.snackBar.open(curso.descripcion + " fue eliminado correctamente", "Ok", {duration: 2000});
        });        
      }
    })    
  }

 

}
